var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    less  = require('gulp-less'),
    path  = require('path');

var http     = require('http'),
    ecstatic = require('ecstatic');

gulp.task('default', [ 'less', 'server', 'watch' ]);

gulp.task('watch', function () {
    gulp.watch('*.less', ['less']);
});

gulp.task('server', function () {
    http.createServer(
        ecstatic({ root: __dirname })
    ).listen(9999);
});

gulp.task('less', function () {
  gulp.src('*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'components', 'bootstrap', 'less') ]
    }))
    .pipe(gulp.dest('.'));
});
