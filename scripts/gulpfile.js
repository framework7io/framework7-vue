/* eslint no-console: ["error", { allow: ["log"] }] */

const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const buildJs = require('./build-js.js');
const buildKs = require('./build-ks.js');
const fs = require('fs');
const path = require('path');

gulp.task('convert-ks', (cb) => {
  fs.readdirSync('./kitchen-sink/src/pages').forEach((fileName) => {
    const ext = path.extname(fileName);
    if (ext === '.html') {
      let fileContent = fs.readFileSync(`./kitchen-sink/src/pages/${fileName}`, 'utf8');
      if (fileContent.indexOf('<template>') < 0) {
        fileContent = `
<template>
${fileContent.trim()}
</template>
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {}
</script>
        `.trim();
      } else {
        fileContent = fileContent.replace('<script>\n  return {', `
<script>
  import { f7Navbar, f7Page } from 'framework7-vue';

  export default {`.trim());
      }
      fs.writeFileSync(`./kitchen-sink/src/pages/${path.basename(fileName, ext)}.vue`, fileContent);
    }
  });
});

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
