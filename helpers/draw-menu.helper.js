/**
 * Draws Menu.
 * @param {string[]} menu Menu Items.
 * @param {number} selectedId Selected Menu Item Index.
 * @author Denis Narush <child.denis@gmail.com>
 */
export function drawMenu(menu, selectedId) {
    this.ctx.save();
    menu.forEach((item, id) => {
        this.ctx.beginPath();
        this.ctx.fillText(
            `${selectedId === id ? ">" : ""} ${item} ${
                selectedId === id ? "<" : ""
            }`,
            this.widthCenter,
            this.heightCenter -
                (16 * 1.4 * menu.length) / 2 +
                16 * 1.4 * id +
                8 * 1.4
        );
    });
    this.ctx.closePath();
    this.ctx.restore();
}
