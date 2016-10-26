var gulp = require('gulp');
var gutil = require('gulp-util');
var sync = require('browser-sync');

gulp.task('watch', function() {
	sync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(["*.html", "*.js"]).on('change', sync.reload);
});
