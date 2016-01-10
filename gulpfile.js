var gulp = require('gulp');
var gls = require('gulp-live-server');
var exec = require('child_process').exec;

gulp.task('dev', function(cb) {
    exec('nodemon', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('serve', function() {
    //1. run your script as a server
    var server = gls.new('app.js');
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
      server.notify.apply(server, [file]);
    });
    gulp.watch('app.js', server.start.bind(server)); //restart my server

    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
    gulp.watch('app.js', function() {
      server.start.bind(server)()
    });
});

gulp.task('default', ['dev'], function() {});
