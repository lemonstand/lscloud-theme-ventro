// Getting started with gulp:
// https://markgoodyear.com/2014/01/getting-started-with-gulp/

// Load plugins
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

// Scripts
gulp.task('scripts', function() {
  return gulp.src('resources/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('resources/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('resources/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Watch
gulp.task('watch', function() {
 
  // Watch .js files
  gulp.watch('resources/js/*.js', ['scripts']);
 
});

// Default task
gulp.task('default', ['scripts', 'watch']);