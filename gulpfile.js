var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    gulpSequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    bowerDir: './bower_components',
}

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('css', function() {
    return gulp.src('scss/hamburgers.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function (callback) {
    gulpSequence('build')(callback);
    gulp.watch('scss/**/*.scss', ['build'])
});

gulp.task('build', function(callback) {
    gulpSequence('clean', ['css'])(callback);
});

gulp.task('default', ['build']);

// GitHub Pages
gulp.task('gh-pages', function(callback) {
    gulpSequence('gh-pages-build')(callback);
    gulp.watch('gh-pages/**/*.scss', ['gh-pages-css']);
    gulp.watch('gh-pages/**/*.js', ['gh-pages-js']);
});

gulp.task('gh-pages-build', function(callback) {
    gulpSequence('clean', ['gh-pages-css', 'gh-pages-js', 'gh-pages-fonts'])(callback);
});

gulp.task('gh-pages-css', function() {
    return gulp.src('gh-pages/scss/main.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('gh-pages-fonts', function() {
    return gulp.src(config.bowerDir + '/components-font-awesome/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('gh-pages-js', function() {
    return gulp.src([
            config.bowerDir + '/jquery/dist/jquery.js', 
            'gh-pages/**/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
