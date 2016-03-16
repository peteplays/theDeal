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
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dev/js'));
    //.pipe(gulp.dest('prod/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify-client']);
});

gulp.task('styles', function() {
  return gulp.src('app/css/main.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dev/css'));
    //.pipe(gulp.dest('prod/css'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('dev/css/bundle.css')
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('prod/css'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('dev/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('prod/js'));
});

gulp.task('build', ['uglify', 'minify']);