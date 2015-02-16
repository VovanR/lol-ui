// See: http://gulpjs.com/

var gulp = require('gulp');
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

gulp.task('html', function () {
    gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    rjs({
        baseUrl: 'src/scripts',
        name: '../../bower_components/almond/almond',
        include: ['main'],
        insertRequire: ['main'],
        // exclude: ['jquery'],
        out: 'all.js',
        paths: {
            jquery: '../../bower_components/jquery/jquery',
        },
        shim: {
        },
        wrap: true,
    })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./dist/*.html'], ['html']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts']);
});

gulp.task('build', ['lint', 'scripts']);

gulp.task('default', ['connect', 'watch']);
