/* eslint no-console: ["error", { allow: ["log"] }] */

const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const buildJs = require('./build-js.js');
const buildKs = require('./build-ks.js');

// Tasks
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('build', ['js']);

gulp.task('ks', (cb) => {
  buildKs(cb);
});

gulp.task('watch', () => {
  gulp.watch('./src/**/**/*.js', ['ks']);
  gulp.watch('./src/**/**/*.vue', ['ks']);
  gulp.watch('./kitchen-sink/**/**/*.vue', ['ks']);
  gulp.watch('./kitchen-sink/app.js', ['ks']);
});

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '8000',
  });
});

gulp.task('open', () => {
  gulp.src('./kitchen-sink/index.html').pipe(gopen({ uri: 'http://localhost:8000/kitchen-sink/' }));
});

gulp.task('server', ['watch', 'connect', 'open']);

gulp.task('default', ['server']);
