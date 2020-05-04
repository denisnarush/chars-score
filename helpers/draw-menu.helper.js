export function drawMenu(menu, selectedId) {
    this.ctx.save();
    this.ctx.font = "italic " + this.ctx.font;
    menu.forEach((item, id) => {
        this.ctx.beginPath();
        this.ctx.fillText(`${selectedId === id ? ">" : ""} ${item} ${selectedId === id ? "<" : ""}`, this.widthCenter, this.heightCenter - (16 * 1.4 * 1 - 8 * 1.4 * menu.length % 2) + 16 * 1.4 * id);
    })
    this.ctx.closePath();
    this.ctx.restore();
}
