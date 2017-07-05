const paths = require('./paths.ext');

module.exports = {
    devServer:{
        contentBase: paths.build,
        port: 9000
    }
};