/**
 * Draws Menu.
 * @param {string[]} menu Menu Items.
 * @param {number} selectedId Selected Menu Item Index.
 * @author Denis Narush <child.denis@gmail.com>
 */
export function drawMenu(menu, selectedId) {
    this.ctx.save();
    this.ctx.font = "100 19px monospace";
    menu.forEach((item, id) => {
        this.ctx.beginPath();
        this.ctx.fillText(
            `${selectedId === id ? ">" : ""} ${item} ${selectedId === id ? "<" : ""}`,
            this.widthCenter,
            this.heightCenter - -id * this.cellSize2 - (menu.length / 2) * this.cellSize2
        );
    });
    this.ctx.closePath();
    this.ctx.restore();
}
