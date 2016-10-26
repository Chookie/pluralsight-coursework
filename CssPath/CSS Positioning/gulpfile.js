var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	browserSync.init( {
		server: {
			baseDir: 'NegativeMargins'
		}
	});
	gulp.watch(['NegativeMargins/*'])
		.on('change',browserSync.reload);
});

gulp.task('default',['watch']);