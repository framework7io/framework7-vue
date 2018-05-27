/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
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

  rollup.rollup({
    input: './kitchen-sink/src/app.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        "'framework7-vue'": () => `'${path.resolve(__dirname, f7VuePath).replace(/\\/g, '/')}'`,
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
  }).then((bundle) => {
    cache = bundle;
    return bundle.write({
      format: 'umd',
      name: 'app',
      strict: true,
      sourcemap: false,
      cache,
      file: './kitchen-sink/js/app.js',
    });
  }).then(() => {
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.log(err.toString());
  });
}

module.exports = build;
