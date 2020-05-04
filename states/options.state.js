import { drawMenu, SETTINGS } from "./../helpers/index.js";

export const OPTIONS_STATE = {
    menu: ["CPM", "MODE", "LANG", "BACK"],
    update: function () {
        const i18n = (v) => this.i18n(v);
        // ENTER
        if (this.CODES["13"] && this.MENU_ITEM === 3) {
            this.CODES["13"] = false;
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // BACKSPACE
        if (this.CODES["8"]) {
            this.CODES["8"] = false;
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.CODES["27"]) {
            this.CODES["27"] = false;
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // DOWN
        if (this.CODES["40"]) {
            this.CODES["40"] = false;
            this.MENU_ITEM = this.MENU_ITEM >= 3 ? 3 : this.MENU_ITEM + 1;
        }
        // LEFT
        if (this.CODES["37"]) {
            this.CODES["37"] = false;
            switch (this.MENU_ITEM) {
                case 0: {
                    this.CPM = SETTINGS.get("CPM");
                    if (this.CPM !== 10) {
                        this.CPM = this.CPM - 10;
                        SETTINGS.set("CPM", this.CPM);
                    }
                    return
                }
                case 1: {
                    if (this.MODE !== 0) {
                        SETTINGS.set("MODE", --this.MODE);
                    }
                    return
                }
                case 2: {
                    if (this.LANG !== 0) {
                        SETTINGS.set("LANG", --this.LANG);
                        this.preload().then( () => {
                            this.LANGS_CHARS = this.i18n('_CHARS');
                        });
                    }
                    return
                }
            }
        }
        // UP
        if (this.CODES["38"]) {
            this.CODES["38"] = false;
            this.MENU_ITEM = this.MENU_ITEM <= 0 ? 0 : this.MENU_ITEM - 1
        }
        // RIGHT 
        if (this.CODES["39"]) {
            this.CODES["39"] = false;
            switch (this.MENU_ITEM) {
                case 0: {
                    this.CPM = SETTINGS.get("CPM");
                    this.CPM = this.CPM + 10;
                    SETTINGS.set("CPM", this.CPM);
                    return
                }
                case 1: {
                    if (this.MODE !== this.MODS.length - 1) {
                        SETTINGS.set("MODE", ++this.MODE);
                    }
                    return
                }
                case 2: {
                    if (this.LANG !== this.LANGS.length - 1) {
                        SETTINGS.set("LANG", ++this.LANG);
                        this.preload().then( () => {
                            this.LANGS_CHARS = this.i18n('_CHARS');
                        });
                    }
                    return
                }
            }
        }
        // BACKSPACE
        if (this.CODES["8"]) {
            this.CODES["8"] = false;
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.CODES["27"]) {
            this.CODES["27"] = false;
            return this.setState(this.STATES.MENU_STATE);
        }
        // Draw Menu
        drawMenu.call(this, [
            `${i18n('CPM')}: ${SETTINGS.get("CPM")}`,
            `${i18n('MODE')}: ${i18n(this.MODS[this.MODE])}`,
            `${i18n('LANG')}: ${i18n(this.LANGS[this.LANG])}`,
            `${i18n('BACK')}`,
        ], this.MENU_ITEM);
    }
}
