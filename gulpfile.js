var gulp = require('gulp'),
uglify = require('gulp-uglify'),
 watch = require('gulp-watch'),
concat = require('gulp-concat'),
notify = require('gulp-notify')

gulp.task('js', function() {

    gulp.src('javascripts/*.js')
      .pipe(uglify())
      .pipe(concat("scripts.js"))
      .pipe(gulp.dest('javascripts'))
      .pipe( notify({ message: "Javascript is now ugly!"}) );

   gulp.src('app.js')
      .pipe(uglify())
      .pipe(concat("app.min.js"))
      .pipe(gulp.dest("../location-selection"))
      .pipe( notify({ message: "App Javascript is now ugly!"}) );
    });

gulp.task('watch', function() {
    gulp.watch('javascripts/*.js', function() {
        gulp.run('js');
      });
    });

gulp.task('default', ['js', 'watch']);