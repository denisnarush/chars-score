/**
 * Class representing Input manger.
 * @author Denis Narush <child.denis@gmail.com>
 */
export class Input {
    /**
     * Create a Input manager.
     */
    constructor() {
        document.addEventListener("keydown", this.keydown);
        this.loop();
    }
    /**
     * Keydown Event.
     * @param {KeyboardEvent} event The keyborad event.
     */
    keydown = (event) => {
        this.keys[event.keyCode] = true;
    };
    /**
     * Keyup Event.
     * @param {KeyboardEvent} event The keyborad event.
     */
    keyup = (event) => {
        if (event.keyCode in this.keys) {
            delete this.keys[event.keyCode];
        }
    };
    /**
     * Creates empty keys object.
     */
    loop = () => (this.keys = Object.create(null));
    /**
     * Is noone key is down.
     */
    isAFK = () => Object.keys(this.keys).length === 0;
    /**
     * Is key down
     * @param {number} keyCode Code of the key.
     */
    isOn = (keyCode) => this.keys[keyCode] === true;
}
