import { NOP } from "./../helpers/index.js";
import { Input } from "./input.module.js";
import { Settings } from "./settings.module.js";

export class G {
    constructor() {
        const width = 40 * 9.6;
        const height = 30 * 9.6;
        // FPS
        const FPS = 1000 / 120;

        this.inputs = new Input();
        this.settings = new Settings("cs-settings");

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
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.ctx = ctx;

        document.body.style.fontSize = "0";
        document.body.style.padding = "0";
        document.body.style.margin = "0";
        document.body.style.height = "100%";
        document.body.style.width = "100%";
        document.documentElement.style.padding = "0";
        document.documentElement.style.margin = "0";
        document.documentElement.style.height = "100%";
        document.documentElement.style.width = "100%";
        document.body.appendChild(canvas);
    }

    async preload() {
        this.i18nJSON = {};
        const data = await fetch(`./assets/i18n/${this.LANGS[this.LANG]}.json`);
        const i18n = await data.json();
        this.i18nJSON = i18n;
    }

    i18n(value) {
        return this.i18nJSON[value] ? this.i18nJSON[value] : value;
    }

    setState(state) {
        this.state = Object.assign({}, state);

        if (this.state.update instanceof Function !== true) {
            this.state.update = NOP.bind(this);
        } else {
            this.state.update = this.state.update.bind(this);
        }

        this.ctx.fillRect(0, 0, this.width, this.height);

        requestAnimationFrame(() => this.loop());
    }

    loop() {
        const now = performance.now();

        if (now > this.t + this.fps) {
            if (now > this.t + this.fps * 3) {
                this.t = now;
                return requestAnimationFrame(() => this.loop());
            } else {
                this.t = this.t + this.fps;
            }

            this.fillCleanRect();

            this.ctx.save();
            this.state.update();
            this.ctx.restore();
        }

        this.inputs.loop();

        return requestAnimationFrame(() => this.loop());
    }

    fillCleanRect() {
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fill();
        this.ctx.restore();
    }
}
