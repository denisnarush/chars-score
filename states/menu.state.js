import { drawMenu } from "./../helpers/index.js";

export const MENU_STATE = {
    menu: ["START", "OPTIONS", "SCOREBOARD"],
    update: function () {
        // DOWN
        if (this.inputs.isOn(40)) {
            if (this.MENU_ITEM !== MENU_STATE.menu.length - 1) {
                ++this.MENU_ITEM;
            }
        }
        // UP
        if (this.inputs.isOn(38)) {
            if (this.MENU_ITEM !== 0) {
                --this.MENU_ITEM;
            }
        }
        // ENTER
        if (this.inputs.isOn(13)) {
            return this.setStateFromMenu();
        }
        // SPACE
        if (this.inputs.isOn(32)) {
            return this.setStateFromMenu();
        }
        // DRAW Menu
        drawMenu.call(this, MENU_STATE.menu.map( item => this.i18n(item) ), this.MENU_ITEM);
    }
}
