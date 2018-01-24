/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup-stream');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const getComponents = require('./get-components.js');

let cache;

function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const f7VuePath = env === 'development'
    ? '../src/framework7-vue'
    : '../dist/framework7-vue.esm.js';
  const components = getComponents();

  const IMPORT_PLUGIN = 'import VuePlugin from \'./vue-plugin.js\';';
  const IMPORT_COMPONENTS = components.map(c => `import ${c.name} from './components/${c.file}';`).join('\n');
  const EXPORT = `
export {
  ${components.map(c => `${c.name},`).join('\n  ')}
};
export default VuePlugin;

  `.trim();
  rollup({
    input: './kitchen-sink/src/app.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'framework7-vue': () => path.resolve(__dirname, f7VuePath).replace(/\\/g, '/'),
        IMPORT_PLUGIN,
        IMPORT_COMPONENTS,
        EXPORT,
        IMPORT_COMPONENTS_BUNDLE: '',
        REGISTER_COMPONENTS_BUNDLE: '',
      }),
      resolve({ jsnext: true }),
      commonjs(),
      vue(),
      buble(),
    ],
    format: 'umd',
    name: 'app',
    strict: true,
    sourcemap: false,
    cache,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err);
    })
    .on('bundle', (bundle) => {
      cache = bundle;
    })
    .pipe(source('app.js', './kitchen-sink'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./kitchen-sink/js/'))
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = build;
