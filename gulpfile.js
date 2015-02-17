// See: http://gulpjs.com/

var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var connect = require('gulp-connect');

var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

// Lint all modules:
// $ gulp lint
// Lint one module:
// $ gulp lint --src src/scripts/main.js
gulp.task('lint', function () {
    var src = argv.src;
    return gulp
        .src(
            src ||
            [
                './src/scripts/**/*.js',
                './gulpfile.js',
            ]
        )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('scripts', function () {
    return gulp
        .src('./src/scripts/**/*.js')
        .pipe(connect.reload());
});

gulp.task('build-scripts', function () {
    rjs({
        baseUrl: 'src/scripts',
        name: '../bower_components/almond/almond',
        include: ['main'],
        insertRequire: ['main'],
        // exclude: ['jquery'],
        out: 'all.js',
        paths: {
            lodash: '../bower_components/lodash/lodash',
            pixi: '../bower_components/pixi.js/bin/pixi',
            uiButton: './button/button',
            uiProgressbar: './progressbar/progressbar',
        },
        shim: {
        },
        wrap: true,
    })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function () {
    return gulp
        .src('./src/index.html')
        .pipe(connect.reload());
});

gulp.task('build-html', function () {
    return gulp
        .src('./src/index.html')
        .pipe(preprocess({
            context: {
               DEBUG: undefined,
            },
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function () {
    return connect.server({
        root: 'src',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/index.html'], ['html']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
});

gulp.task('build', ['build-html', 'build-scripts']);

gulp.task('default', ['connect', 'watch']);
