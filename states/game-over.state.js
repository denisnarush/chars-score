import { drawMenu } from "./../helpers/index.js";

export const GAME_OVER_STATE = {
    update: function () {
        // BACKSPACE
        if (this.inputs.isOn(8)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.inputs.isOn(27)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // ENTER
        if (this.inputs.isOn(13)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // Draw menu like results
        drawMenu.call(this, [
            `${this.i18n("GAME OVER")}`,
            `${this.i18n("SCORE")}: ${this.SCORE}`,
        ]);
    },
};
