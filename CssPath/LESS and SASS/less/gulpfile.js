var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

// Static server
gulp.task('serve', ['less','copyhtml','copyjs','copycss'], function() {
    browserSync.init({
        server:'./dist'
    });
    gulp.watch(['./app/less/*.less'],['less']);
    gulp.watch(['./app/*.html'],['copyhtml']);
    gulp.watch(['./app/js/*.js'],['copyjs']);
    gulp.watch(['./app/css/*.css'],['copycss']);
    gulp.watch(['./dist/*.html','./dist/js/*.js']).on('change', browserSync.reload);
});

// Compile less
gulp.task('less', function() {
    return gulp.src('./app/less/My.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('copyhtml', function() {
    return gulp.src(['app/*.html'])
        .pipe(gulp.dest('./dist'))
})

gulp.task('copyjs', function() {
    return gulp.src(['app/js/*.js'])
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('copycss', function() {
    return gulp.src(['app/css/*.css'])
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('default',['serve']);