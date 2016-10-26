var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Static server
gulp.task('serve', ['sass','copyhtml','copyjs','copycss'], function() {
    browserSync.init({
        server:'./dist'
    });
    gulp.watch(['./app/scss/*.scss'],['sass']);
    gulp.watch(['./app/*.html'],['copyhtml']);
    gulp.watch(['./app/js/*.js'],['copyjs']);
    gulp.watch(['./app/css/*.css'],['copycss']);
    gulp.watch(['./dist/*.html','./dist/js/*.js']).on('change', browserSync.reload);
});

// Compile sass
gulp.task('sass', function() {
    return gulp.src('./app/scss/My.scss')
        .pipe(sass())
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
    return gulp.src(['app/scss/*.css'])
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('default',['serve']);