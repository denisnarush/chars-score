import { randomCharWithExcept, randomWithExcept } from "./../helpers/index.js";

// Add Char
function addChar() {
    let c = randomCharWithExcept(this.LANGS_CHARS);
    let x = randomWithExcept(40);

    if (this.CHARS.length) {
        const last = this.CHARS[this.CHARS.length - 1];

        if (last.c === c) {
            c = randomCharWithExcept(this.LANGS_CHARS, c);
        }

        if (last.x === x * 9.6 - 4.8) {
            x = randomWithExcept(40, x);
        }
    }
    // CHAR
    const char = {
        // CHAR
        c: c,
        // COL
        x: x * 9.6 - 4.8,
        // TOP
        y: 0,
        // TIME
        t: performance.now(),
    };
    // ADD
    this.CHARS.push(char);
}
// Update Chars
function updateChars() {
    // Exit if empty
    if (!this.CHARS.length) {
        return false;
    }
    // Time
    const now = performance.now();
    this.ctx.save();
    // Iteration
    this.ctx.textAlign = "center";

    if (this.MODE !== 0) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    }
    // Char fall speed
    const speed = this.fps / (50 - Math.floor(this.SCORE / 25));
    // Update
    this.CHARS.forEach((char) => {
        // Update char y position
        if (now > char.t) {
            char.t = char.t;
            char.y = char.y + speed;
        }
        // Condition for Game Over
        if (char.y - 5 >= this.height) {
            // Scoreboard update
            const scoreboard = this.settings.get("SCOREBOARD");
            scoreboard[this.MODE][this.LANG].push(this.SCORE);
            scoreboard[this.MODE][this.LANG].sort((a, b) => {
                if (b > a) {
                    return 1;
                }

                if (b < a) {
                    return -1;
                }

                if (b == a) {
                    return 0;
                }
            });
            scoreboard[this.MODE][this.LANG].pop();
            this.settings.set("SCOREBOARD", scoreboard);

            return this.setState(this.STATES.GAME_OVER_STATE);
        }
        // Draw Char
        this.ctx.beginPath();
        this.ctx.fillText(`${char.c}`, char.x, char.y);
        this.ctx.closePath();
    });

    this.ctx.restore();

    // Highlight last char in NORMAL and HARD mode
    if (this.MODE !== 0) {
        this.ctx.beginPath();
        this.ctx.fillText(
            `${this.CHARS[0].c}`,
            this.CHARS[0].x,
            this.CHARS[0].y
        );
        this.ctx.closePath();
    }

    // Return if no key
    if (this.inputs.isAFK()) {
        return false;
    }

    // Removing char
    const index = this.CHARS.findIndex((char) =>
        this.inputs.isOn(char.c.charCodeAt(0))
    );

    switch (this.MODE) {
        /* YEASY LVL */
        case 0: {
            // You can shoot at any chars
            if (index !== -1) {
                this.CHARS.splice(index, 1);
                this.CPM = Math.floor(
                    ++this.SCORE / 10 + this.settings.get("CPM")
                );
            }
            return;
        }
        /* NORMAL LVL */
        case 1: {
            // You can shoot in chars only in fall-up order
            if (index === 0) {
                this.CHARS.shift();
                this.CPM = Math.floor(
                    ++this.SCORE / 10 + this.settings.get("CPM")
                );
            }
            return;
        }
        /* HARD LVL */
        case 2: {
            // If you miss game will add new char skipping
            if (index === -1 || index !== 0) {
                this.T = now - 90000 / this.CPM;
            } else if (index === 0) {
                this.CHARS.shift();
                this.CPM = Math.floor(
                    ++this.SCORE / 10 + this.settings.get("CPM")
                );
            }
            return;
        }
    }
}

export const GAME_STATE = {
    update: function () {
        // BACKSPACE
        if (this.inputs.isOn(8)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // ESC
        if (this.inputs.isOn(27)) {
            return this.setState(this.STATES.MENU_STATE);
        }
        // SCORE to the title
        document.title = `${this.TITLE} ${this.CPM}/${this.SCORE}`;
        // Now
        const now = performance.now();
        // Delta for adding new char
        const d = 60000 / this.CPM;
        // Adding Char ?
        if (now > this.T + d) {
            if (now > this.T + d * 3) {
                return (this.T = now);
            } else {
                this.T = this.T + d;
            }
            addChar.call(this);
        }
        // Update Chars
        updateChars.call(this);
    },
};
