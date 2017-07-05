const merge = require('webpack-merge');

const commonList = require('./ext-list.common');

const uglifyjsExt = require('./uglifyjs.ext');
const babelExt = require('./babel.ext');

module.exports = merge([
    commonList,
    babelExt,
    uglifyjsExt
]);