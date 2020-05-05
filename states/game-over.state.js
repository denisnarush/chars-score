import { drawMenu } from "./../helpers/index.js";

export const GAME_OVER_STATE = {
    update: function () {
        const i18n = (v) => this.i18n(v);
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
        // Draw menu like results
        drawMenu.call(this, [
            `${i18n('GAME OVER')}`,
            `${i18n('SCORE')}: ${this.SCORE}`
        ]);
    }
}
