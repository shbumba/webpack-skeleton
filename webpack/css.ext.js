const paths = require('./paths.ext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]/app.bundle.css'),
    ],
};