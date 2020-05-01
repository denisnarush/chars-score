export class G {
    LANGS = ["EN"];
    LANG = 0;

    constructor() {
        const width  = 40 * 9.6;
        const height = 30 * 9.6;
        // FPS
        const FPS = 1000 / 120;

        this.width = width;
        this.widthCenter = width / 2;
        this.height = height;
        this.heightCenter = height / 2;

        this.fps = FPS;
        this.t = performance.now();

        const canvas = document.createElement("canvas");
        canvas.style.imageRendering = "pixelated";
        canvas.height = height;
        canvas.width = width;
        canvas.style.height = "100%";
        canvas.style.width = "100%";

        const ctx = canvas.getContext("2d");
        ctx.font = "100 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.ctx = ctx;

        document.body.style.fontSize = "0";
        document.body.style.padding = "0";
        document.body.style.margin = "0";
        document.body.style.height = "100%";
        document.body.style.width = "100%";
        document.documentElement.style.cursor = "none";
        document.documentElement.style.padding = "0";
        document.documentElement.style.margin = "0";
        document.documentElement.style.height = "100%";
        document.documentElement.style.width = "100%";
        document.body.appendChild(canvas);

        this.preload();
    }

    async preload() {
        this.i18n = {};
        const data = await fetch(`./assets/i18n/${this.LANGS[this.LANG]}.json`);
        const i18n = await data.json();
        this.i18n = i18n;
    }

    translate(value) {
        return this.i18n[value] ? this.i18n[value] : value;
    }

    setState(state) {
        this.state = state;
        this.state.update || (this.state.update = function () {});
        requestAnimationFrame(this.loop.bind(this))
    }

    loop() {
        const now = performance.now();
        if (now > this.t + this.fps) {
            if (now > this.t + this.fps * 3) {
                this.t = now;
                return requestAnimationFrame(this.loop.bind(this));
            } else {
                this.t = this.t + this.fps;
            }

            this.ctx.beginPath();
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.closePath();

            this.ctx.save();
            this.ctx.fillStyle = "white";
            this.state.update.call(this);
            this.ctx.restore();
        }
        requestAnimationFrame(this.loop.bind(this))
    }
}