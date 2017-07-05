const envMode = process.env.mode;

module.exports = ({ file, options, env }) => ({
    plugins: {
        'precss': {},
        'postcss-math': {},
        'postcss-assets': {},
        'postcss-import': {},
        'postcss-cssnext': {},
        'postcss-short': {},
        'cssnano': envMode === 'prod' ? {} : false
    }
});