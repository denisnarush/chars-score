import { drawMenu } from "./../helpers/index.js";

export const SCOREBOARD_STATE = {
    update() {
        // ENTER
        if (this.inputs.isOn(13)) {
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }
        // BACKSPACE
        if (this.inputs.isOn(8)) {
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.inputs.isOn(27)) {
            this.MENU_ITEM = 2;
            return this.setState(this.STATES.MENU_STATE);
        }

        const scoreboard = this.settings.get("SCOREBOARD")[this.MODE][
            this.LANG
        ];

        drawMenu.call(this, [
            `RANK       SCORE`,
            `====================`,
            ` 1st       ${
                new Array(7 - scoreboard[0].toString().length).join(0) +
                scoreboard[0]
            }`,
            ` 2nd       ${
                new Array(7 - scoreboard[1].toString().length).join(0) +
                scoreboard[1]
            }`,
            ` 3rd       ${
                new Array(7 - scoreboard[2].toString().length).join(0) +
                scoreboard[2]
            }`,
            ` 4th       ${
                new Array(7 - scoreboard[3].toString().length).join(0) +
                scoreboard[3]
            }`,
            ` 5th       ${
                new Array(7 - scoreboard[4].toString().length).join(0) +
                scoreboard[4]
            }`,
        ]);
    },
};
