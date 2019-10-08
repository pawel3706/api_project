const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./sass/**/*', style);
  gulp.watch(['./*.html', './js/*', './img/*']).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
