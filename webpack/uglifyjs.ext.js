const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ]
};