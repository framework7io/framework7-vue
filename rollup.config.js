import buble from 'rollup-plugin-buble';
import vue from 'rollup-plugin-vue';
export default {
    entry: './src/framework7-vue.js',
    dest: './dist/framework7-vue.js',
    plugins: [vue(), buble()],
    format: 'umd',
    moduleName: 'Framework7Vue',
    useStrict: false
};