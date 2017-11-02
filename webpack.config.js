const merge = require('webpack-merge');
const webpack = require('webpack');

const paths = require('./webpack/paths.ext');

const uglifyjsExt = require('./webpack/uglifyjs.ext');

const extListDev = require('./webpack/ext-list.dev');
const extListProd = require('./webpack/ext-list.prod');

function getConfig(name) {
  let uglify = name.indexOf('min') > -1;

  let common = {
    entry: {},
    node: {
      fs: 'empty',
      process: false
    },
    output: {
      path: paths.build,
      filename: '[name]/app' + name + '.js',
      publicPath: '/dist',
      sourceMapFilename: '[name]/app' + name + '.map'
      /*libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true*/
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      })
    ],
    devtool: 'source-map'
  };

  if (uglify) {
    common = merge([common, uglifyjsExt]);
  }

  return common;
}

module.exports = function (env) {
  process.env.mode = env;

  let config = [];
  let list = [''];

  if (env === 'prod') {
    list.push('.min');
  }

  list.forEach(function (key) {
    config.push(merge([
      getConfig(key),
      (env === 'dev') ? extListDev : extListProd
    ]));
  });

  return config;
};
