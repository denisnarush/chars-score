import { NOP } from "./../helpers/index.js";
import { Input } from "./input.module.js";
import { Settings } from "./settings.module.js";

export class G {
    constructor() {
        // FPS
        const FPS = 1000 / 120;

        this.inputs = new Input();
        this.settings = new Settings("cs-settings");
        this.cellsX = 48;
        this.cellsY = 30;
        this.cellSize = 8;
        this.cellSize2 = this.cellSize * 2;
        this.cells = this.cellsX * this.cellsY;
        this.width = this.cellsX * this.cellSize;
        this.height = this.cellsY * this.cellSize;
        this.widthCenter = this.width / 2;
        this.heightCenter = this.height / 2;

        this.fps = FPS;
        this.t = performance.now();

        const canvas = document.createElement("canvas");
        canvas.style.imageRendering = "pixelated";
        canvas.height = this.height;
        canvas.width = this.width;
        canvas.style.height = "100%";
        canvas.style.width = "100%";

        const ctx = canvas.getContext("2d");
        // 10, 19
        ctx.font = "100 10px monospace";
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

            // this.drawGrid();
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

    drawGrid() {
        this.ctx.save();
        this.ctx.lineWidth = 0.05;
        this.ctx.strokeStyle = "rgba(255,255,255,1)";
        let i = 0;
        while (i <= this.cells - 1) {
            this.ctx.strokeRect(
                (i - Math.floor(i / this.cellsX) * this.cellsX) * this.cellSize,
                Math.floor(i / this.cellsX) * this.cellSize,
                this.cellSize,
                this.cellSize
            );
            i++;
        }

        this.ctx.restore();
    }
}
