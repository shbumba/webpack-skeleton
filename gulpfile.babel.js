import gulp from 'gulp';
import gzip from 'gulp-gzip';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import watch from 'gulp-watch';
import w3cValid from 'gulp-htmlhint';
import gulpFilter from 'gulp-filter';
import mainBowerFiles from 'main-bower-files';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import newer from 'gulp-newer';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import includeHTML from 'gulp-file-include';
import gulpUtil from 'gulp-util';
import ftpSync from 'vinyl-ftp';

import postcss from 'gulp-postcss';
import imagesizecss from 'postcss-assets';
import cssmin from 'cssnano';
import cssnext from 'postcss-cssnext';
import styleshort from 'postcss-short';
import precss from 'precss';
import cssmath from 'postcss-math';

import browserSync from 'browser-sync';
const reload = browserSync.reload;

const path = {
    build: {
        views: './dist/views/',
        js: './dist/js/',
        css: './dist/css/',
        img: './dist/img/',
        fonts: './dist/fonts/'
    },
    src: {
        views: './src/views/',
        src: './src/',
        js: './src/js/',
        vendor: './src/vendor/',
        style: './src/style/',
        img: './src/img/',
        fonts: './src/fonts/',
    }
};
// const dep = ftpSync.create({
//     host: '195.62.70.100',
//     user: 'asd-door',
//     password: 'oQjRdTbj',
//     parallel: 10,
//     log: gulpUtil.log
// });

gulp.task('build-js', () => {
    return gulp.src(`${path.src.js}*.js`)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            compact: false
        }))
        //.pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('build-style', () => {
    const processors = [
        precss,
        cssmath,
        imagesizecss,
        cssnext,
        styleshort,
        cssmin({
            autoprefixer: false
        })
    ];
    return gulp.src(`${path.src.style}*.css`)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        //.pipe(dep.dest('/www/door.qx2.ru/dist/css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
});

gulp.task('build-html', () => {
    return gulp.src(`${path.src.views}*.html`)
        .pipe(includeHTML({
            prefix: '@@',
            basepath: './src/views/templates/'
        }))
        .pipe(w3cValid())
        .pipe(gulp.dest(path.build.views))
        .pipe(reload({stream:true}));
});

gulp.task('build-vendor', () => {
    const filterJS = gulpFilter('**/*.js', {restore: true}),
        filterCSS = gulpFilter('**/*.css');
    let bowerFiles = mainBowerFiles();

    if (bowerFiles.length <= 0) {
        return false;
    }

    return gulp.src(bowerFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(filterJS)
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        .pipe(gulp.dest(`${path.build.js}`))
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest(`${path.build.css}`))
        .pipe(reload({stream:true}))
});

gulp.task('build-img', () => {
    return gulp.src(`${path.src.img}**/**.*`)
        .pipe(gulp.dest(path.build.img))
});

gulp.task('build-fonts', () => {
    return gulp.src(`${path.src.fonts}**.*`)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('browser-sync', () => {
    return browserSync({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        open: false,
        notify: false
    });
});

gulp.task('watch', () => {
    gulp.parallel('browser-sync')();

    watch(`${path.src.views}**/*.html`, gulp.parallel('build-html'));
    watch(`${path.src.style}**/*.css`, gulp.parallel('build-style'));
    watch(`${path.src.js}**/*.js`, gulp.parallel('build-js'));
    watch(`${path.src.img}**/*.*`, gulp.parallel('build-img'));
    watch(`${path.src.fonts}**/*.*`, gulp.parallel('build-fonts'));
    watch(`${path.src.vendor}**/*.{css,js}`, gulp.parallel('build-vendor'));
});

gulp.task('default', gulp.parallel(
    'build-js',
    'build-style',
    'build-html',
    'build-img',
    'build-fonts',
    'build-vendor',
    'watch'
));

gulp.task('deploy', gulp.parallel(
    'build-js',
    'build-style',
    'build-html',
    'build-img',
    'build-fonts',
    'build-vendor'
));
