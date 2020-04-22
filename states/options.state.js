export const OPTIONS_STATE = {
    update: function () {
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
                    return this.CPM = this.CPM <= 10 ? 10 : this.CPM - 10;
                }
                case 1: {
                    return this.MODE = this.MODE <= 0 ? 0 : this.MODE - 1;
                }
                case 2: {
                    return this.LANG = this.LANG <= 0 ? 0 : this.LANG - 1;
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
                    return this.CPM = this.CPM + 10;
                }
                case 1: {
                    return this.MODE = this.MODE >= this.MODS.length - 1 ? this.MODE = this.MODS.length - 1 : this.MODE + 1;
                }
                case 2: {
                    return this.LANG = this.LANG >= this.LANGS.length - 1 ? this.LANG = this.LANGS.length - 1 : this.LANG + 1;
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
        // Draw Options
        this.ctx.beginPath();
        this.ctx.font = "italic " + this.ctx.font;
        this.ctx.fillText(`${this.MENU_ITEM === 0 ? ">" : ""} CPM: ${this.CPM} ${this.MENU_ITEM === 0 ? "<" : ""}`, this.widthCenter, this.heightCenter - 24 * 1.4);
        this.ctx.fillText(`${this.MENU_ITEM === 1 ? ">" : ""} MODE: ${this.MODS[this.MODE]} ${this.MENU_ITEM === 1 ? "<" : ""}`, this.widthCenter, this.heightCenter - 8 * 1.4);
        this.ctx.fillText(`${this.MENU_ITEM === 2 ? ">" : ""} LANG: ${this.LANGS[this.LANG]} ${this.MENU_ITEM === 2 ? "<" : ""}`, this.widthCenter, this.heightCenter + 8 * 1.4);
        this.ctx.fillText(`${this.MENU_ITEM === 3 ? ">" : ""} BACK ${this.MENU_ITEM === 3 ? "<" : ""}`, this.widthCenter, this.heightCenter + 24 * 1.4);
        this.ctx.closePath();
    }
}
