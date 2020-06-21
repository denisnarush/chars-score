export class Settings {
    constructor(key) {
        this.key = key;
    }

    set = (key, value) => {
        const obj = JSON.parse(localStorage.getItem(this.key)) || {};
            obj[key] = value;
        localStorage.setItem(this.key, JSON.stringify(obj));
    }

    get = (key) => {
        const obj = JSON.parse(localStorage.getItem(this.key)) || {};

        if (obj.hasOwnProperty(key) === false) {
            switch(key) {
                case 'CPM': {
                    obj.CPM = 30;
                    break;
                }
                case 'MODE': {
                    obj.MODE = 1;
                    break;
                }
                case 'SCORE': {
                    obj.SCORE = 0;
                    break;
                }
                case 'SCOREBOARD': {
                    obj.SCOREBOARD = [
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ]
                    ];
                    break;
                }
                case 'LANG': {
                    obj.LANG = 0;
                    break;
                }
            }

            localStorage.setItem(this.key, JSON.stringify(obj));
        }

        return obj[key];
    }
}
