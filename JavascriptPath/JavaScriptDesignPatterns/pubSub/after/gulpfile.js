var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

gulp.task('copyhtml', function() {
	gutil.log('Copying all html files to dist');
	return gulp.src(['app/*.html','app/*.png'])
		.pipe(gulp.dest('dist'))
		.on('end', function() {
			gutil.log('HTML copy complete!');
		});
});

gulp.task('copyfonts', function() {
	gutil.log('Copying all font files to dist');
	return gulp.src(['node_modules/bootstrap/dist/fonts/*','node_modules/font-awesome/fonts/*'])
		.pipe(gulp.dest('dist/fonts'))
		.on('end', function() {
			gutil.log('Font copy complete!');
		});
});

gulp.task('copycss', function() {
	gutil.log('Copying all bootstrap css files to dist');
	return gulp.src(['node_modules/bootstrap/dist/css/*','node_modules/font-awesome/css/*','app/*.css'])
		.pipe(gulp.dest('dist/css'))
		.on('end', function() {
			gutil.log('CSS copy complete!');
		});
});

// gulp.task('compile', function() {
// 	var fs = require('fs');
// 	var source = require('vinyl-source-stream');
// 	var transform = require('vinyl-transform');
// 	var browserify = require('browserify');

// 	var browserified = transform(function(filename) {
// 		var b = browserify(filename);
// 		return b.bundle();
// 	});

// 	return gulp.src(['app/*.js'])
// 		.pipe(browserified)
// 		.pipe(gulp.dest('dist'));
// });

gulp.task('compile', function() {
	var fs = require('fs');
	var source = require('vinyl-source-stream');
	var browserify = require('browserify');

	return browserify([
			'app/index.js',
			'app/big-cart.js',
			'app/mini-cart.js',
			'app/product-list.js',
			'app/pubsubMessaging.js'
		])
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
});

// gulp.task('compile', function() {
// 	var fs = require('fs');
// 	var source = require('vinyl-source-stream');
// 	var browserify = require('browserify');

// 	return browserify(['app/index.js'])
// 		.transform('babelify', {presets: ['es2015']})
// 		.bundle()
// 		.pipe(source('bundle.js'))
// 		.pipe(gulp.dest('dist'));
// });

// Static server
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch(["app/*.js"],['compile']);
    gulp.watch(["app/*.html"],['copyhtml']);
    gulp.watch(["dist/*"]).on('change', browserSync.reload);
});

gulp.task('default', ['compile', 'copyhtml', 'copycss', 'copyfonts'], function() {
	gutil.log('Compilation completed!');
});