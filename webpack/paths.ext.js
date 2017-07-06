const path = require('path');

const changeDir = function (dir) {
    let result = {};

    if (typeof dir === 'object') {
        for (let key in dir) {
            if (!dir.hasOwnProperty(key)) {
                continue;
            }

            result[key] = changeDir(dir[key]);
        }
    } else if(typeof dir === 'string') {
        result = path.join(__dirname, dir.replace('./', ''));
    }

    return result;
};

const paths = {
    build: './../dist/',
    src: {
        src: './../src/',
        app: './../src/app/',
        views: './../src/views/'
    }
};

module.exports = changeDir(paths);