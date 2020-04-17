import { G } from "./game.js";
// Instance
const CSGame = new G();
// KEY CODES
const CODES = {
    8  : false, // BACKSPACE
    13 : false, // ENTER
    27 : false, // ESC
    32 : false, // SPACE
    37 : false, // LEFT
    38 : false, // UP
    39 : false, // RIGHT
    40 : false, // DOWN
}
// TITLE
const TITLE = document.title;
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
// MODE | DIFFICULTY
const MODS = ["EASY", "NORMAL", "HARD"]
let MODE = 1;
// STATES
const STATES = {
    "MENU": {
        update: function () {
            // DOWN
            if (CODES["40"]) {
                CODES["40"] = false;
                MENU_ITEM = MENU_ITEM >= 1 ? 1 : MENU_ITEM + 1;
            }
            // UP
            if (CODES["38"]) {
                CODES["38"] = false;
                MENU_ITEM = MENU_ITEM <= 0 ? 0 : MENU_ITEM - 1
            }
            // ENTER
            if (CODES["13"]) {
                CODES["13"] = false;
                return setStateFromMenu();
            }
            // SPACE
            if (CODES["32"]) {
                CODES["32"] = false;
                return setStateFromMenu();
            }
            // DRAW MENU
            this.ctx.beginPath();
            this.ctx.font = "italic " + this.ctx.font;
            this.ctx.fillText(`${MENU_ITEM === 0 ? ">" : ""} START ${MENU_ITEM === 0 ? "<" : ""}`, this.widthCenter, this.heightCenter - 8 * 1.4);
            this.ctx.fillText(`${MENU_ITEM === 1 ? ">" : ""} OPTIONS ${MENU_ITEM === 1 ? "<" : ""}`, this.widthCenter, this.heightCenter + 8 * 1.4);
            this.ctx.closePath();
        }
    },
    "GAME": {
        update: function () {
            // BACKSPACE
            if (CODES["8"]) {
                CODES["8"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES["27"]) {
                CODES["27"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // Score to the title
            document.title = `${TITLE} ${Math.floor(SCORE / 10 + CPM)}/${SCORE}`;
            // Now
            const now = Math.floor(performance.now());
            // Adding Char ?
            const d = 60000 / (Math.floor(SCORE / 10 + CPM));
            if (now > T + d) {
                if (now > T + d * 3) {
                    return T = now;
                } else {
                    T = T + d;
                }
                addChar();
            }
            // Update Chars
            updateChars.call(this);
        }
    },
    "OPTIONS": {
        update: function () {
            // ENTER
            if (CODES["13"] && MENU_ITEM === 2) {
                CODES["13"] = false;
                MENU_ITEM = 1;
                return CSGame.setState(STATES.MENU);
            }
            // BACKSPACE
            if (CODES["8"]) {
                CODES["8"] = false;
                MENU_ITEM = 1;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES["27"]) {
                CODES["27"] = false;
                MENU_ITEM = 1;
                return CSGame.setState(STATES.MENU);
            }
            // DOWN
            if (CODES["40"]) {
                CODES["40"] = false;
                MENU_ITEM = MENU_ITEM >= 2 ? 2 : MENU_ITEM + 1;
            }
            // LEFT
            if (CODES["37"]) {
                CODES["37"] = false;
                switch (MENU_ITEM) {
                    case 0: {
                        return CPM = CPM <= 10 ? 10 : CPM - 10;
                    }
                    case 1: {
                        return MODE = MODE <= 0 ? 0 : MODE - 1;
                    }
                }
            }
            // UP
            if (CODES["38"]) {
                CODES["38"] = false;
                MENU_ITEM = MENU_ITEM <= 0 ? 0 : MENU_ITEM - 1
            }
            // RIGHT 
            if (CODES["39"]) {
                CODES["39"] = false;
                switch (MENU_ITEM) {
                    case 0: {
                        return CPM = CPM + 10;
                    }
                    case 1: {
                        return MODE = MODE >= MODS.length - 1 ? MODE = MODS.length - 1 : MODE + 1;
                    }
                }
            }
            // BACKSPACE
            if (CODES["8"]) {
                CODES["8"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES["27"]) {
                CODES["27"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // Draw Options
            this.ctx.beginPath();
            this.ctx.font = "italic " + this.ctx.font;
            this.ctx.fillText(`${MENU_ITEM === 0 ? ">" : ""} CPM: ${CPM} ${MENU_ITEM === 0 ? "<" : ""}`, this.widthCenter, this.heightCenter - 16 * 1.4);
            this.ctx.fillText(`${MENU_ITEM === 1 ? ">" : ""} MODE: ${MODS[MODE]} ${MENU_ITEM === 1 ? "<" : ""}`, this.widthCenter, this.heightCenter - 0 * 1.4);
            this.ctx.fillText(`${MENU_ITEM === 2 ? ">" : ""} BACK ${MENU_ITEM === 2 ? "<" : ""}`, this.widthCenter, this.heightCenter + 16 * 1.4);
            this.ctx.closePath();
        }
    },
    "GAME_OVER": {
        update: function () {
            // BACKSPACE
            if (CODES["8"]) {
                CODES["8"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ESC
            if (CODES["27"]) {
                CODES["27"] = false;
                return CSGame.setState(STATES.MENU);
            }
            // ENTER
            if (CODES["13"]) {
                CODES["13"] = false;
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
        case 1: {
            MENU_ITEM = 0;
            return CSGame.setState(STATES.OPTIONS);
        }
    }
};
// Add Char
function addChar() {
    // CHAR
    const char = {
        // 0 - 40 col
        x: Math.floor(Math.random() * 40 + 1) * 9.6 - 4.8,
        // TOP
        y: 0,
        // 65 - 90 is A - Z
        v: String.fromCharCode(Math.floor(Math.random() * 26 + 65)),
        // TIME
        t: performance.now()
    };
    // ADD
    CHARS.push(char);
};
// Update Chars
function updateChars() {
    // Exit if empty
    if (!CHARS.length) {
        return false;
    }
    // Time
    const now = performance.now();
    // Iteration
    this.ctx.beginPath();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.65)";

    // Char fall speed
    const speed = this.fps / (50 - Math.floor(SCORE / 25));

    CHARS.forEach( char => {
        // Update char y position
        if (now > char.t) {
            char.t = char.t;
            char.y = char.y + speed;
        }
        // Condition for Game Over
        if (char.y >= this.height - 16) {
            return CSGame.setState(STATES.GAME_OVER);
        };
        // Draw Char
        this.ctx.fillText(`${char.v}`, char.x, char.y);
    });


    // Highlight last char in NORMAL and HARD mode
    if (MODE !== 0) {
        this.ctx.fillText(`${CHARS[0].v}`, CHARS[0].x, CHARS[0].y);
    }

    this.ctx.closePath();

    // Return if no key
    if (!KEY) {
        return false;
    }
    // Removing char
    const index = CHARS.findIndex( char => KEY === char.v );
    // Clean key
    KEY = undefined;

    switch (MODE) {
/* YEASY LVL */
        case 0: {
            // You can shoot at any chars
            if (index !== -1) {
                CHARS.splice(index, 1);
                SCORE = SCORE + 1;
            }
            return
        }
/* NORMAL LVL */
        case 1: {
            // You can shoot in chars only in fall-up order
            if (index === 0) {
                CHARS.shift();
                SCORE = SCORE + 1;
            }
            return
        }
/* HARD LVL */
        case 2: {
            // If you miss game will add new char skipping
            if (index === -1 || index !== 0) {
                T = now - 90000 / (Math.floor(SCORE / 10 + CPM));
            } else if (index === 0) {
                CHARS.shift();
                SCORE = SCORE + 1;
            }
            return
        }
    }

};
// Restart
function restart() {
    T = performance.now();
    KEY = "";
    CHARS = [];
    SCORE = 0;
};

window.addEventListener("keydown", (event) => {
    if (event.keyCode in CODES) {
        CODES[event.keyCode] = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode in CODES) {
        CODES[event.keyCode] = false;
    }
});

window.addEventListener("keypress", (event) => {
    KEY = String.fromCharCode(event.charCode).toUpperCase();
});

CSGame.setState(STATES.MENU);
