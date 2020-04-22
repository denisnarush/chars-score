export const MENU_STATE = {
    update: function () {
        // DOWN
        if (this.CODES["40"]) {
            this.CODES["40"] = false;
            this.MENU_ITEM = this.MENU_ITEM >= 1 ? 1 : this.MENU_ITEM + 1;
        }
        // UP
        if (this.CODES["38"]) {
            this.CODES["38"] = false;
            this.MENU_ITEM = this.MENU_ITEM <= 0 ? 0 : this.MENU_ITEM - 1
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
        // DRAW MENU
        this.ctx.beginPath();
        this.ctx.font = "italic " + this.ctx.font;
        this.ctx.fillText(`${this.MENU_ITEM === 0 ? ">" : ""} START ${this.MENU_ITEM === 0 ? "<" : ""}`, this.widthCenter, this.heightCenter - 8 * 1.4);
        this.ctx.fillText(`${this.MENU_ITEM === 1 ? ">" : ""} OPTIONS ${this.MENU_ITEM === 1 ? "<" : ""}`, this.widthCenter, this.heightCenter + 8 * 1.4);
        this.ctx.closePath();
    }
}
