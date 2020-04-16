import { G } from "./game.js";

const CODES = {
    8  : false, // BACKSPACE
    13 : false, // ENTER
    27 : false, // ESC
    32 : false, // SPACE
    38 : false, // UP
    40 : false, // DOWN
}
// SELECTED MENU ITEM
let MENU_ITEM = 0;
// SCORE
let SCORE = 0;
// CHARS
let CHARS = [];
// KEYS
let KEY = "";
let T = 0;
let ADD_SPEED = 1500;
let SPEED = 50;


function setStateFromMenu() {
    switch (MENU_ITEM) {
        case 0: {
            reset();
            return game.setState(STATES.GAME);
        }
    }
}
// Add Char
function addChar() {
    // CHAR
    const char = {
        // 0 - 20 col
        x: Math.floor(Math.random() * 26 + 1) * 9.6 - 4.8,
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
    const now = performance.now();
    let bottomCharIndex;

    CHARS.forEach( (char, i) => {
        if (KEY === char.v) {
            if (bottomCharIndex === undefined) {
                bottomCharIndex = i;
            }
            if (char.y > CHARS[i].y) {
                bottomCharIndex = i;
            }
        }
        if (now > char.t + SPEED) {
            char.t = char.t + SPEED;
            char.y = char.y + SPEED / 100;
        }
        // Condition for Game Over
        if (char.y >= this.height - 16) {
            return game.setState(STATES.GAME_OVER);
        };
        // Draw Char
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${char.v}`, char.x, char.y);
        this.ctx.closePath();
    })

    if (bottomCharIndex !== undefined) {
        KEY = "";
        SCORE = SCORE + 1;
        CHARS.splice(bottomCharIndex, 1);
    }
}

function reset() {
    T = performance.now();
    KEY = "";
    CHARS = [];
    SCORE = 0;
}

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
                return game.setState(STATES.MENU);
            }
            // ESC
            if (CODES['27']) {
                CODES['27'] = false;
                return game.setState(STATES.MENU);
            }

            this.ctx.beginPath();
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "bottom";
            this.ctx.rect(0, this.height - 16 * 1.1, this.width - 0.5, 16 * 1.025);
            this.ctx.fillText(`SCORE:${SCORE}`, 2, this.height);
            this.ctx.strokeStyle = "white";
            this.ctx.stroke();
            this.ctx.closePath();

            let now = Math.floor(performance.now());

            if (now > T + ADD_SPEED) {
                T = T + ADD_SPEED;
                addChar();
            }

            updateChars.call(this);
        }
    },
    "GAME_OVER": {
        update: function () {
            // BACKSPACE
            if (CODES['8']) {
                CODES['8'] = false;
                return game.setState(STATES.MENU);
            }
            // ESC
            if (CODES['27']) {
                CODES['27'] = false;
                return game.setState(STATES.MENU);
            }

            // DRAW MENU
            this.ctx.beginPath();
            this.ctx.font = "italic " + this.ctx.font;
            this.ctx.fillText(`GAME OVER`, this.widthCenter, this.heightCenter - 8 * 1.4);
            this.ctx.fillText(`SCORE: ${SCORE}`, this.widthCenter, this.heightCenter + 8 * 1.4);
            this.ctx.closePath();
        }
    }
};

window.addEventListener('keydown', (event) => {
    if (event.keyCode in CODES) {
        CODES[event.keyCode] = true;
    }
})

window.addEventListener('keypress', (event) => {
    KEY = String.fromCharCode(event.charCode).toUpperCase();
})

const game = new G();
game.setState(STATES.MENU);