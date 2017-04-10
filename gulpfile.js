'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 7000,
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
});

gulp.task('develop', function (cb) {
    var started = false;

  return nodemon({ script:
            'server.js'
          , watch: ['*.js']
    })
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
    .on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
})

gulp.task('default', ['browser-sync', 'develop']);
