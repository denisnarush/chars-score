export class Input {
    constructor() {
        this.loop();
        document.addEventListener('keydown', this.keydown);
        // document.addEventListener('keyup', this.keyup);
    }

    keydown = (event) => {
        this.keys[event.keyCode] = true;
    }

    keyup = (event) => {
        if(event.keyCode in this.keys) {
            delete this.keys[event.keyCode]
        }
    }

    loop = () => {
        this.keys = Object.create(null);
    }

    getKeys = () => Object.keys(this.keys);
    
    isOn = (keyCode) => {
        return this.keys[keyCode] === true;
    }
}