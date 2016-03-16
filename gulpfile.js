// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('browserify-client', function() {
  return gulp.src('app/js/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify-client']);
});

gulp.task('styles', function() {
  return gulp.src('app/css/main.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('app/css/app.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('app/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('build', ['uglify', 'minify']);