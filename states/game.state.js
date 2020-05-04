import { SETTINGS } from "./../helpers/index.js";

// Add Char
function addChar() {
    // CHAR
    const char = {
        // 0 - 40 col
        x: Math.floor(Math.random() * 40 + 1) * 9.6 - 4.8,
        // TOP
        y: 0,
        // CHAR
        c: this.LANGS_CHARS[Math.floor(Math.random() * this.LANGS_CHARS.length)],
        // TIME
        t: performance.now()
    };
    // ADD
    this.CHARS.push(char);
};
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
    this.CHARS.forEach( char => {
        // Update char y position
        if (now > char.t) {
            char.t = char.t;
            char.y = char.y + speed;
        }
        // Condition for Game Over
        if (char.y >= this.height) {
            return this.setState(this.STATES.GAME_OVER_STATE);
        };
        // Draw Char
        this.ctx.beginPath();
        this.ctx.fillText(`${char.c}`, char.x, char.y);
        this.ctx.closePath();
    });

    this.ctx.restore();

    // Highlight last char in NORMAL and HARD mode
    if (this.MODE !== 0) {
        this.ctx.beginPath();
        this.ctx.fillText(`${this.CHARS[0].c}`, this.CHARS[0].x, this.CHARS[0].y);
        this.ctx.closePath();
    }

    // Return if no key
    if (!this.KEY) {
        return false;
    }
    // Removing char
    const index = this.CHARS.findIndex( char => this.KEY === char.c );
    // Clean key
    this.KEY = undefined;

    switch (this.MODE) {
    /* YEASY LVL */
        case 0: {
            // You can shoot at any chars
            if (index !== -1) {
                this.CHARS.splice(index, 1);
                this.CPM = Math.floor(++this.SCORE / 10 + SETTINGS.get("CPM"));
            }
            return
        }
    /* NORMAL LVL */
        case 1: {
            // You can shoot in chars only in fall-up order
            if (index === 0) {
                this.CHARS.shift();
                this.CPM = Math.floor(++this.SCORE / 10 + SETTINGS.get("CPM"));
            }
            return
        }
    /* HARD LVL */
        case 2: {
            // If you miss game will add new char skipping
            if (index === -1 || index !== 0) {
                this.T = now - 90000 / this.CPM;
            } else if (index === 0) {
                this.CHARS.shift();
                this.CPM = Math.floor(++this.SCORE / 10 + SETTINGS.get("CPM"));
            }
            return
        }
    }

};

export const GAME_STATE = {
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
        // SCORE to the title
        document.title = `${this.TITLE} ${this.CPM}/${this.SCORE}`;
        // Now
        const now = performance.now();
        // Delta for adding new char
        const d = 60000 / this.CPM;
        // Adding Char ?
        if (now > this.T + d) {
            if (now > this.T + d * 3) {
                return this.T = now;
            } else {
                this.T = this.T + d;
            }
            addChar.call(this);
        }
        // Update Chars
        updateChars.call(this);
    }
}
