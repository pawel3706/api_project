const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('.public/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.public/css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  gulp.watch('./public/sass/**/*', style);
  gulp.watch(['./public/*.html', './public/js/*', './public/img/*']).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;