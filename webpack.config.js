"use strict"

const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack  = require('webpack');
const path = require('path') ;

module.exports = {

    entry: {
        app : "./kitchen-sink/app.js",
    },
    
    output: {       
        path  : __dirname + '/kitchen-sink/',
        publicPath:'/',
        filename: 'build.js'
    },

    watch: NODE_ENV=='development',

    watchOptions : {      
      aggregateTimeout : 100
    },

    devtool: NODE_ENV=='development' ? "cheap-inline-module-source-map" : null ,

    resolve:{
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },

    resolveLoader:{
        root: path.join(__dirname, 'node_modules'),
    },

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


if (NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
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