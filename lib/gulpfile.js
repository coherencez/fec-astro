'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');



gulp.task('lint', function() {
  return gulp.src(['../app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {}
  );
});

gulp.task('sass', function() {
  return gulp.src('../sass/*.s*ss')
    // sourcemaps + sass + error handling
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceComments: true,
      outputStyle: 'compressed'  // nested || compressed
    }))
    .on('error', function (err) { gutil.log(gutil.colors.bgRed(err)) })
    // generate .maps
    .pipe(sourcemaps.write({
      'includeContent': false,
      'sourceRoot': '.'
    }))
    .pipe(sourcemaps.write({
      'includeContent': true
    }))
    // write sourcemaps to a specific directory
    // give it a file and save
    .pipe(gulp.dest('../css'));
});

gulp.task('watch', function() {
  gulp.watch(['../app/**/*.js', '../sass/**/*.s*ss'], ['lint', 'sass']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['lint', 'sass', 'watch']);
