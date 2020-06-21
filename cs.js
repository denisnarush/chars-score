import { G } from "./modules/game.module.js";
import * as STATES from "./states/index.js";


// Instance
const CSGame = new G();
// CSGame.STATES
CSGame.STATES = STATES;
// CHAR LANGUAGES
CSGame.LANGS = ["EN", "RU"];
CSGame.LANG = CSGame.settings.get("LANG");
// MODE | DIFFICULTY
CSGame.MODS = ["EASY", "NORMAL", "HARD"];
CSGame.MODE = CSGame.settings.get("MODE");
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
CSGame.CPM = CSGame.settings.get("CPM");
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
    this.CPM = this.settings.get("CPM");
    this.CHARS = [];
    this.SCORE = 0;
};

CSGame.preload().then( () => {
    CSGame.LANGS_CHARS = CSGame.i18nJSON._CHARS;
    CSGame.setState(CSGame.STATES.MENU_STATE);
})

