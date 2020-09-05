import { drawMenu } from "./../helpers/index.js";

export const OPTIONS_STATE = {
    menu: ["CPM", "MODE", "LANG", "BACK"],
    update: function () {
        // ENTER
        if (this.inputs.isOn(13) && this.MENU_ITEM === 3) {
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // BACKSPACE
        if (this.inputs.isOn(8)) {
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.inputs.isOn(27)) {
            this.MENU_ITEM = 1;
            return this.setState(this.STATES.MENU_STATE);
        }
        // DOWN
        if (this.inputs.isOn(40)) {
            this.MENU_ITEM = this.MENU_ITEM >= 3 ? 3 : this.MENU_ITEM + 1;
        }
        // LEFT
        if (this.inputs.isOn(37)) {
            switch (this.MENU_ITEM) {
                case 0: {
                    this.CPM = this.settings.get("CPM");
                    if (this.CPM !== 10) {
                        this.CPM = this.CPM - 10;
                        this.settings.set("CPM", this.CPM);
                    }
                    return;
                }
                case 1: {
                    if (this.MODE !== 0) {
                        this.settings.set("MODE", --this.MODE);
                    }
                    return;
                }
                case 2: {
                    if (this.LANG !== 0) {
                        this.settings.set("LANG", --this.LANG);
                        this.preload().then(() => {
                            this.LANGS_CHARS = this.i18n("_CHARS");
                        });
                    }
                    return;
                }
            }
        }
        // UP
        if (this.inputs.isOn(38)) {
            this.MENU_ITEM = this.MENU_ITEM <= 0 ? 0 : this.MENU_ITEM - 1;
        }
        // RIGHT
        if (this.inputs.isOn(39)) {
            switch (this.MENU_ITEM) {
                case 0: {
                    this.CPM = this.settings.get("CPM");
                    this.CPM = this.CPM + 10;
                    this.settings.set("CPM", this.CPM);
                    return;
                }
                case 1: {
                    if (this.MODE !== this.MODS.length - 1) {
                        this.settings.set("MODE", ++this.MODE);
                    }
                    return;
                }
                case 2: {
                    if (this.LANG !== this.LANGS.length - 1) {
                        this.settings.set("LANG", ++this.LANG);
                        this.preload().then(() => {
                            this.LANGS_CHARS = this.i18n("_CHARS");
                        });
                    }
                    return;
                }
            }
        }
        // BACKSPACE
        if (this.inputs.isOn(8)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.inputs.isOn(27)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // Draw Menu
        drawMenu.call(
            this,
            [
                `${this.i18n("CPM")}: ${this.settings.get("CPM")}`,
                `${this.i18n("MODE")}: ${this.i18n(this.MODS[this.MODE])}`,
                `${this.i18n("LANG")}: ${this.i18n(this.LANGS[this.LANG])}`,
                `${this.i18n("BACK")}`,
            ],
            this.MENU_ITEM
        );
    },
};
