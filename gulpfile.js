var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

//-- build css and js
gulp.task('css', function() {
  return gulp.src('app/app.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/app.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('www/js'))
    .pipe(browserSync.stream());
});

//-- get fa and bootstrap icons
gulp.task('fa-icons', function() { 
  return gulp.src('node_modules/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('www/fonts')); 
});

gulp.task('bs-icons', function() { 
  return gulp.src('node_modules/bootstrap/fonts/**.*') 
    .pipe(gulp.dest('www/fonts')); 
});

//-- minify css and uglify js
gulp.task('minify', ['css'], function() {
  return gulp.src('www/css/bundle.css')
    .pipe(minifyCSS({processImport: false}))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task('uglify', ['js'], function() {
  return gulp.src('www/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('www/js'));
});

//-- live reloading
gulp.task('live-reload', function() {
  browserSync.init({
    port: 7777,
    server: {
      baseDir: ['www', 'resources']
    }
  });
  gulp.watch("app/css/*.less", ['css']);
  gulp.watch("app/js/*.js", ['reload-js']);
  gulp.watch("www/*.html").on('change', browserSync.reload);
});

gulp.task('reload-js', ['js'], browserSync.reload);

//-- run tasks
gulp.task('default', ['js', 'css', 'live-reload']);
gulp.task('local', ['js', 'css']);
gulp.task('build', ['uglify', 'fa-icons', 'bs-icons', 'minify']);

