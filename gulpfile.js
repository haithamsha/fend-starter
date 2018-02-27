
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');

// Sass to css 
gulp.task('sass', function () {
    return gulp.src('./lib/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build'));
});

// minfy js files
gulp.task('uglify', function () {
   return gulp.src('./lib/**/*.js')
   .pipe(uglify())
   .pipe(rename({ suffix: '.min' }))
       .pipe(gulp.dest('./build/'));
});

// Compress images
gulp.task('img', function(){
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

// watch files
gulp.task('watch',function(){
    gulp.watch('./lib/**/*.scss',['sass']);
    gulp.watch('./lib/**/*.js', ['uglify']);
    gulp.watch('./images/**/*', ['img']);
});

gulp.task('default', ['sass', 'watch', 'uglify', 'img'] );