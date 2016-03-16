var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();

//--build css and js
gulp.task('css', function() {
  return gulp.src('app/app.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('www/js'))
    .pipe(browserSync.stream());
});

//-- minify css and uglify js
gulp.task('minify', ['css'], function() {
  return gulp.src('www/css/bundle.css')
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task('uglify', ['js'], function() {
  return gulp.src('www/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('www/js'));
});

//--live reloading
gulp.task('live-reload', function() {
  browserSync.init({
    port: 7777,
    server: {
      baseDir: ['www', 'media']
    }
  });
  gulp.watch("app/css/*.less", ['css']);
  gulp.watch("app/js/*.js", ['reload-js']);
  gulp.watch("www/*.html").on('change', browserSync.reload);
});

gulp.task('reload-js', ['js'], browserSync.reload);

//-- run tasks
gulp.task('default', ['uglify', 'minify', 'live-reload']);
gulp.task('build', ['uglify', 'minify']);
gulp.task('deploy', ['uglify', 'minify']);

