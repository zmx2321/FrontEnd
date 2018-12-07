var gulp = require('gulp')
var fs = require('fs')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('gulp-babel')
var imagemin = require('gulp-imagemin');

gulp.task('wxml', function() {
    gulp.src('./app/**/*.html')
        .pipe(rename(function(path) {
            path.extname = '.wxml'
        }))
        .pipe(gulp.dest('build/'))
})

gulp.task('sass', function() {
    gulp.src('./app/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename(function(path) {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest('build'))
})

gulp.task('json', function() {
    gulp.src('./app/**/*.json')
        // .pipe(yaml({ space: 2 }))
        .pipe(gulp.dest('build'))
})

gulp.task('js', function() {
    gulp.src('./app/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'))
})

gulp.task('image', function() {
    gulp.src('./app/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('build'))
})

gulp.task('default', ['wxml', 'sass', 'json', 'js', "image"], function() {
    gulp.watch('./app/**/*.wxml', ['wxml'])
    gulp.watch('./app/**/*.scss', ['sass'])
    gulp.watch('./app/**/*.json', ['json'])
    gulp.watch('./app/**/*.js', ['js'])
})