import { G } from "./modules/game.module.js";
import { SETTINGS } from "./helpers/index.js";

import * as STATES from "./states/index.js";



// Instance
const CSGame = new G();
// CSGame.STATES
CSGame.STATES = STATES;
// CHAR LANGUAGES
CSGame.LANGS = ["EN", "RU"];
CSGame.LANG = SETTINGS.get("LANG");
// MODE | DIFFICULTY
CSGame.MODS = ["EASY", "NORMAL", "HARD"];
CSGame.MODE = SETTINGS.get("MODE");
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
CSGame.CPM = SETTINGS.get("CPM");
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
        case 2: {
            return this.setState(this.STATES.SCOREBOARD_STATE);
        }
    }
};
// Restart
CSGame.restart = function () {
    this.T = performance.now();
    this.KEY = "";
    this.CPM = SETTINGS.get("CPM");
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

CSGame.preload().then( () => {
    CSGame.LANGS_CHARS = CSGame.i18nJSON._CHARS;
    CSGame.setState(CSGame.STATES.MENU_STATE);
})

