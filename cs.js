import { G } from "./game.js";
// Instance
const CSGame = new G();
// KEY CODES
const CODES = {
    8  : false, // BACKSPACE
    13 : false, // ENTER
    27 : false, // ESC
    32 : false, // SPACE
    38 : false, // UP
    40 : false, // DOWN
}
// FPS
const FPS = 16;
// SELECTED MENU ITEM
let MENU_ITEM = 0;
// SCORE
let SCORE = 0;
// CHARS
let CHARS = [];
// KEYS
let KEY = "";
// TIME
let T = 0;
// Char Per Minute
let CPM = 30;
// STATES
const STATES = {
    "MENU": {
        update: function () {
            // DOWN
            if (CODES['40']) {
                CODES['40'] = false;
                MENU_ITEM = MENU_ITEM >= 1 ? 1 : MENU_ITEM + 1;
            }
            // UP
            if (CODES['38']) {
                CODES['38'] = false;
                MENU_ITEM = MENU_ITEM <= 0 ? 0 : MENU_ITEM - 1
            }
            // ENTER
            if (CODES['13']) {
                CODES['13'] = false;
                return setStateFromMenu();
            }
            // SPACE
            if (CODES['32']) {
                CODES['32'] = false;
                return setStateFromMenu();
            }
            // DRAW MENU
            this.ctx.beginPath();
            this.ctx.font = "italic " + this.ctx.font;
            this.ctx.fillText(`${MENU_ITEM === 0 ? '>' : ''} start ${MENU_ITEM === 0 ? '<' : ''}`, this.widthCenter, this.heightCenter - 0 * 1.4);
            this.ctx.closePath();
        }
    },
    "GAME": {
        update: function () {
            // BACKSPACE
            if (CODES['8']) {
                CODES['8'] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES['27']) {
                CODES['27'] = false;
                return CSGame.setState(STATES.MENU);
            }
            // Draw Panel
            this.ctx.beginPath();
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "bottom";
            this.ctx.rect(0, this.height - 16 * 1.1, this.width - 0.5, 16 * 1.025);
            this.ctx.fillText(`CPM:${Math.floor(SCORE / 10 + CPM)}, SCORE:${SCORE}`, 2, this.height);
            this.ctx.strokeStyle = "white";
            this.ctx.stroke();
            this.ctx.closePath();
            // Now
            const now = Math.floor(performance.now());
            // Adding Char ?
            if (now > T + 60000 / (Math.floor(SCORE / 10 + CPM))) {
                T = T + 60000 / (Math.floor(SCORE / 10 + CPM));
                addChar();
            }
            // Update Chars
            updateChars.call(this);
        }
    },
    "GAME_OVER": {
        update: function () {
            // BACKSPACE
            if (CODES['8']) {
                CODES['8'] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES['27']) {
                CODES['27'] = false;
                return CSGame.setState(STATES.MENU);
            }
            // Draw Menu
            this.ctx.beginPath();
            this.ctx.font = "italic " + this.ctx.font;
            this.ctx.fillText(`GAME OVER`, this.widthCenter, this.heightCenter - 8 * 1.4);
            this.ctx.fillText(`SCORE: ${SCORE}`, this.widthCenter, this.heightCenter + 8 * 1.4);
            this.ctx.closePath();
        }
    }
};
// Set State From Menu
function setStateFromMenu() {
    switch (MENU_ITEM) {
        case 0: {
            restart();
            return CSGame.setState(STATES.GAME);
        }
    }
}
// Add Char
function addChar() {
    // CHAR
    const char = {
        // 0 - 20 col
        x: Math.floor(Math.random() * 40 + 1) * 9.6 - 4.8,
        // TOP
        y: 0,
        // 65 - 90 A - Z
        v: String.fromCharCode(Math.floor(Math.random() * 26 + 65)),
        // CREATING TIME
        t: performance.now()
    };
    // ADD
    CHARS.push(char);
}
// Update Chars
function updateChars() {
    // Exit if empty
    if (!CHARS.length) {
        return false;
    }
    // Time
    const now = performance.now();
    // Iteration
    CHARS.forEach( (char, i) => {
        // Update char y position
        if (now > char.t + FPS) {
            char.t = char.t + FPS;
            char.y = char.y + 1 / 3;
        }
        // Condition for Game Over
        if (char.y >= this.height - 16) {
            return CSGame.setState(STATES.GAME_OVER);
        };
        // Draw Char
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${char.v}`, char.x, char.y);
        this.ctx.closePath();
    })
    // Removing char
    if (KEY === CHARS[0].v) {
        KEY = "";
        SCORE = SCORE + 1;
        CHARS.shift();
    }
}
// Restart
function restart() {
    T = performance.now();
    KEY = "";
    CHARS = [];
    SCORE = 0;
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode in CODES) {
        CODES[event.keyCode] = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode in CODES) {
        CODES[event.keyCode] = false;
    }
})

window.addEventListener('keypress', (event) => {
    KEY = String.fromCharCode(event.charCode).toUpperCase();
})

CSGame.setState(STATES.MENU);
