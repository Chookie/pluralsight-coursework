var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "Layout"
        }
    });
    gulp.watch(["Layout/*"]).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);