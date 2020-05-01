import * as STATES from "states/_index.js";

import { G } from "modules/game.module.js";


// Instance
const CSGame = new G();
// CSGame.STATES
CSGame.STATES = STATES;
// CHAR LANGUAGES
CSGame.LANGS = ["EN", "RU"];
CSGame.LANGS_CHARS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
CSGame.LANG = 0;
// MODE | DIFFICULTY
CSGame.MODS = ["EASY", "NORMAL", "HARD"];
CSGame.MODE = 1;
// KEY CODES
CSGame.CODES = {
    8  : false, // BACKSPACE
    13 : false, // ENTER
    27 : false, // ESC
    32 : false, // SPACE
    37 : false, // LEFT
    38 : false, // UP
    39 : false, // RIGHT
    40 : false, // DOWN
};
// KEYS
CSGame.KEY = "";
// TITLE
CSGame.TITLE = document.title;
// SELECTED MENU ITEM
CSGame.MENU_ITEM = 0;
// SCORE
CSGame.SCORE = 0;
// CHARS
CSGame.CHARS = [];
// TIME
CSGame.T = 0;
// Char Per Minute
CSGame.CPM = 30;
// Set State From Menu
CSGame.setStateFromMenu = function () {
    switch (this.MENU_ITEM) {
        case 0: {
            this.restart();
            return this.setState(this.STATES.GAME_STATE);
        }
        case 1: {
            this.MENU_ITEM = 0;
            return this.setState(this.STATES.OPTIONS_STATE);
        }
    }
};
// Restart
CSGame.restart = function () {
    this.T = performance.now();
    this.KEY = "";
    this.CHARS = [];
    this.SCORE = 0;
};

window.addEventListener("keydown", (event) => {
    if (event.keyCode in CSGame.CODES) {
        CSGame.CODES[event.keyCode] = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode in CSGame.CODES) {
        CSGame.CODES[event.keyCode] = false;
    }
});

window.addEventListener("keypress", (event) => {
    CSGame.KEY = String.fromCharCode(event.charCode).toUpperCase();
});

CSGame.setState(CSGame.STATES.MENU_STATE);
