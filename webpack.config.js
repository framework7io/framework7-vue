"use strict"

//Указываем окружение сборки
// в console: NODE_ENV=production webpack
const NODE_ENV = process.env.NODE_ENV || 'development';

//Подключаем webpack для использования внутренних плагинов
//Необходима предустановка webpack в директорию проекта
const webpack  = require('webpack');
const path = require('path') ;

module.exports = {

    entry: {
        app : "./src/main.js",
    },
    
    output: {       
        path  : __dirname + '/dist',
        //Для require.ensure необходимм publicPath
        publicPath:'/dist/',
        filename: 'framework7.vue.js'
    },

    //Запусткать процесс отслеживания изменений
    watch: NODE_ENV=='development',

    //С какой переодичностью проверять на новые изменения
    watchOptions : {      
      aggregateTimeout : 100
    },

    //Генерация source-map для отладки
    devtool: NODE_ENV=='development' ? "cheap-inline-module-source-map" : null ,

    //Указваем путь до расширений
    resolve:{
        // modulesDirectories:['node_modules'],
        // extensions: ['','.js'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },

    //Указваем путь до расширений загрузчиков
    resolveLoader:{
        root: path.join(__dirname, 'node_modules'),
    },

    //подключение модулей
    //Говорим прогнать все файлы .js через babel с опцией presenters = ['es2015']
    module : {
        loaders : [
          {
            test:/\.vue$/,
            loader: 'vue'
          },
          {
            test:/\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        presets: ['es2015']
    }
};


//Если проект в production 
if (NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}