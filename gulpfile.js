var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    less  = require('gulp-less'),
    path  = require('path');


gulp.task('default', function () {
    gulp.watch('*.less', ['less']);
});

gulp.task('less', function () {
  gulp.src('*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'components', 'bootstrap', 'less') ]
    }))
    .pipe(gulp.dest('.'));
});
