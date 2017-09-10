/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const gulp = require('gulp');
const rollup = require('rollup-stream');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue2');

const banner = require('./banner.js');

function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  rollup({
    entry: './kitchen-sink/app.js',
    plugins: [
      vue(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
      }),
      resolve({ jsnext: true }),
      buble(),
    ],
    format: 'umd',
    moduleName: 'KS',
    useStrict: true,
    sourceMap: true,
    banner,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('app.js', './kitchen-sink'))
    .pipe(buffer())
    .pipe(gulp.dest('./kitchen-sink/js/'))
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = build;
