/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const gulp = require('gulp');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const vue = require('rollup-plugin-vue');
const banner = require('./banner.js');
const getComponents = require('./get-components.js');

function es(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';

  const components = getComponents();

  const IMPORT_PLUGIN = 'import VuePlugin from \'./vue-plugin.js\';';
  const IMPORT_COMPONENTS = components.map(c => `import ${c.name} from './components/${c.file}';`).join('\n');
  const REGISTER_COMPONENTS_BUNDLE = components.map(c => `${c.name},`).join('\n        ');
  const EXPORT = `
export {
  ${components.map(c => `${c.name},`).join('\n  ')}
};
export default VuePlugin;
  `.trim();

  let cbs = 0;

  // Modular
  rollup.rollup({
    input: './src/framework7-vue.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        IMPORT_PLUGIN,
        IMPORT_COMPONENTS,
        EXPORT,
        IMPORT_COMPONENTS_BUNDLE: '',
        REGISTER_COMPONENTS_BUNDLE: '',
      }),
      vue(),
    ],
  }).then(bundle => bundle.write({
    format: 'es',
    name: 'Framework7Vue',
    strict: true,
    sourcemap: false,
    banner,
    file: './dist/framework7-vue.esm.js',
  })).then(() => {
    cbs += 1;
    if (cbs === 2 && cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });

  // Bundle Build
  rollup.rollup({
    input: './src/vue-plugin.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        IMPORT_COMPONENTS_BUNDLE: IMPORT_COMPONENTS,
        REGISTER_COMPONENTS_BUNDLE,
      }),
      vue(),
    ],

  }).then(bundle => bundle.write({
    format: 'es',
    name: 'Framework7Vue',
    strict: true,
    sourcemap: false,
    banner,
    file: './dist/framework7-vue.esm.bundle.js',
  })).then(() => {
    cbs += 1;
    if (cbs === 2 && cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}
function umd(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';

  const components = getComponents();

  const IMPORT_COMPONENTS = components.map(c => `import ${c.name} from './components/${c.file}';`).join('\n');
  const REGISTER_COMPONENTS_BUNDLE = components.map(c => `${c.name},`).join('\n        ');
  rollup.rollup({
    input: './src/vue-plugin.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        IMPORT_COMPONENTS_BUNDLE: IMPORT_COMPONENTS,
        REGISTER_COMPONENTS_BUNDLE,
      }),
      vue(),
      buble(),
    ],
  }).then(bundle => bundle.write({
    format: 'umd',
    name: 'Framework7Vue',
    strict: true,
    sourcemap: env === 'development',
    sourcemapFile: './dist/framework7-vue.js.map',
    banner,
    file: './dist/framework7-vue.js',
  })).then(() => {
    if (env === 'development') {
      if (cb) cb();
      return;
    }
    // Minified version
    gulp.src('./dist/framework7-vue.js')
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(rename((filePath) => {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        filePath.basename += '.min';
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'))
      .on('end', () => {
        cb();
      });
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}
function build(cb) {
  const env = process.env.NODE_ENV || 'development';

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;
  umd(() => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });

  if (env === 'production') {
    es(() => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
  }
}

module.exports = build;
