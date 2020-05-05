import { drawMenu } from "./../helpers/index.js";

export const MENU_STATE = {
    menu: ["START", "OPTIONS", "SCOREBOARD"],
    update: function () {
        const i18n = (v) => this.i18n(v);
        // DOWN
        if (this.CODES["40"]) {
            this.CODES["40"] = false;
            if (this.MENU_ITEM !== MENU_STATE.menu.length - 1) {
                ++this.MENU_ITEM;
            }
        }
        // UP
        if (this.CODES["38"]) {
            this.CODES["38"] = false;
            if (this.MENU_ITEM !== 0) {
                --this.MENU_ITEM;
            }
        }
        // ENTER
        if (this.CODES["13"]) {
            this.CODES["13"] = false;
            return this.setStateFromMenu();
        }
        // SPACE
        if (this.CODES["32"]) {
            this.CODES["32"] = false;
            return this.setStateFromMenu();
        }
        // DRAW Menu
        drawMenu.call(this, MENU_STATE.menu.map( item => i18n(item) ), this.MENU_ITEM);
    }
}
