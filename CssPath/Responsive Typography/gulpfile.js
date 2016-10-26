var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	browserSync.init( {
		server: {
			baseDir: 'mycode'
		}
	});
	gulp.watch(['mycode/*'])
		.on('change',browserSync.reload);
});

gulp.task('default',['watch']);