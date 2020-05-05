import { drawMenu, SETTINGS } from "./../helpers/index.js";

export const SCOREBOARD_STATE = {
    update: function() {
        // ENTER
        if (this.CODES["13"]) {
            this.CODES["13"] = false;
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }
        // BACKSPACE
        if (this.CODES["8"]) {
            this.CODES["8"] = false;
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.CODES["27"]) {
            this.CODES["27"] = false;
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }

        const scoreboard = SETTINGS.get('SCOREBOARD')[this.MODE][this.LANG];

        drawMenu.call(this, [
            `RANK       SCORE`,
            `====================`,
            ` 1st       ${new Array(7 - scoreboard[0].toString().length).join(0) + scoreboard[0]}`,
            ` 2nd       ${new Array(7 - scoreboard[1].toString().length).join(0) + scoreboard[1]}`,
            ` 3rd       ${new Array(7 - scoreboard[2].toString().length).join(0) + scoreboard[2]}`,
            ` 4th       ${new Array(7 - scoreboard[3].toString().length).join(0) + scoreboard[3]}`,
            ` 5th       ${new Array(7 - scoreboard[4].toString().length).join(0) + scoreboard[4]}`
        ]);
    }
}