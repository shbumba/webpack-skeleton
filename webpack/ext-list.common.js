const merge = require('webpack-merge');

const entries = require('./../entries');

const twigExt = require('./twig.ext');
const cssExt = require('./css.ext');
const postcssExt = require('./postcss.ext');
const imagesExt = require('./images.ext');
const vueExt = require('./vue.ext');

module.exports = merge([
    entries,
    vueExt,
    twigExt,
    cssExt,
    postcssExt,
    imagesExt
]);
