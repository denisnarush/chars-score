export const SETTINGS = {
    set: (key, value) => {
        const obj = JSON.parse(localStorage.getItem('settings')) || {};
            obj[key] = value;
        localStorage.setItem('settings', JSON.stringify(obj));
    },
    get: (key) => {
        const obj = JSON.parse(localStorage.getItem('settings')) || {};

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
                case 'LANG': {
                    obj.LANG = 0;
                    break;
                }
            }

            localStorage.setItem('settings', JSON.stringify(obj));
        }

        return obj[key];
    }
}
