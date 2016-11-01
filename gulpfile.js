'use strict'
const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
var cssnano = require('gulp-cssnano')
const runSequence = require('run-sequence')

var jsFilePaths = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js'
]

var cssFilePaths = [
	'node_modules/bootstrap/dist/css/bootstrap-theme.css',
	'node_modules/bootstrap/dist/css/bootstrap.css'
]

gulp.task('clean', function (cb) {
	del(['dist']).then(function (paths) {
		console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
	});
});


gulp.task('bundle', function () {
	//first load the services, then the directives and then the controller
	return gulp.src(jsFilePaths)
			.pipe(concat('main.js'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/'));
})

gulp.task('bundle-css', function(){
	return gulp.src(cssFilePaths)
		.pipe(cssnano())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/'));
})

gulp.task('copy-assets', function(){
	return gulp.src(['content/*'])
			.pipe(gulp.dest('dist/content/'))
});


gulp.task('build', function(callback){
	runSequence('clean', 
				'bundle',				
				'bundle-css', 
				'copy-assets', 				
				callback);
});