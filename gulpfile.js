var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();

//--build js and css
gulp.task('js', function() {
  return gulp.src('app/js/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dev/js'))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src('app/css/main.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.stream());
});

//-- minify css and uglify js
gulp.task('minify', ['css'], function() {
  return gulp.src('dev/css/bundle.css')
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('prod/css'));
});

gulp.task('uglify', ['js'], function() {
  return gulp.src('dev/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('prod/js'));
});

//--live reloading
gulp.task('live-reload', function() {
    browserSync.init({
        port: 7777,
        server: {
          baseDir: ['dev', 'media']
        }
    });
    gulp.watch("app/css/*.less", ['css']);
    gulp.watch("app/js/*.js", ['reload-js']);
    gulp.watch("dev/*.html").on('change', browserSync.reload);
});

gulp.task('reload-js', ['js'], browserSync.reload);

//-- run tasks
gulp.task('default', ['uglify', 'minify', 'live-reload']);
gulp.task('build', ['uglify', 'minify', 'live-reload']);
gulp.task('deploy', ['uglify', 'minify']);

