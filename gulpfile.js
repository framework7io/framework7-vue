(function () {
    'use strict';
    var gulp = require('gulp'),
        header = require('gulp-header'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        rollup = require('rollup-stream'),
        buble = require('rollup-plugin-buble'),
        vue = require('rollup-plugin-vue2'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        rename = require('gulp-rename'),
        pkg = require('./package.json'),
        banner = [
            '/**',
            ' * Framework7 Vue <%= pkg.version %>',
            ' * <%= pkg.description %>',
            ' * <%= pkg.homepage %>',
            ' * ',
            ' * Copyright <%= date.year %>, <%= pkg.author %>',
            ' * The iDangero.us',
            ' * http://www.idangero.us/',
            ' * ',
            ' * Licensed under <%= pkg.license %>',
            ' * ',
            ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
            ' */',
            ''].join('\n');

    gulp.task('dist', function (cb) {
        rollup({
            entry: './src/framework7-vue.js',
            plugins: [vue(), buble()],
            format: 'umd',
            moduleName: 'Framework7Vue',
            useStrict: false,
            sourceMap: true
        })
        .pipe(source('framework7-vue.js', './src'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(header(banner, {
            pkg: pkg,
            date: (function () {
                return {
                    year: new Date().getFullYear(),
                    month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                    day: new Date().getDate()
                };
            })()
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'))
        .on('end', function () {
            gulp.src('./dist/framework7-vue.js')
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(header(banner, {
                    pkg: pkg,
                    date: (function () {
                        return {
                            year: new Date().getFullYear(),
                            month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                            day: new Date().getDate()
                        };
                    })()
                }))
                .pipe(rename('framework7-vue.min.js'))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/'))
                .on('end', function () {
                    cb();
                });
        });
    });
})();
