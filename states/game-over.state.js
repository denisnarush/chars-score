export const GAME_OVER_STATE = {
    update: function () {
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
        // ENTER
        if (this.CODES["13"]) {
            this.CODES["13"] = false;
            return this.setState(this.STATES.MENU_STATE);
        }
        // Draw MENU_STATE
        this.ctx.beginPath();
        this.ctx.font = "italic " + this.ctx.font;
        this.ctx.fillText(`GAME OVER`, this.widthCenter, this.heightCenter - 8 * 1.4);
        this.ctx.fillText(`SCORE: ${this.SCORE}`, this.widthCenter, this.heightCenter + 8 * 1.4);
        this.ctx.closePath();
    }
}
