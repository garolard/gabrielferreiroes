var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('less', function() {
	return gulp.src(['./less/**/*.less'])
		.pipe(less({
			paths: [ path.join(__dirname, 'less') ]
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(rename({suffix : '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify({ message : 'Styles compiled' }));
});

gulp.task('typescript', function(){
	return gulp.src(['./ts/declarations/**/*.ts', './ts/**/*.ts'])
		//.pipe(sourcemaps.init())
		.pipe(ts({
			declarationFiles : false,
			noExternalResolve : true
		}))
		//.pipe(sourcemaps.write('./dist/maps'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(rename({suffix : '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify({message : 'TypeScript compiled and minified'}));
});

gulp.task('clean', function(cb) {
	return del(['dist/js', 'dist/css', 'dist/index.html'], cb)
});


gulp.task('bootstrap', function() {
	return gulp.src('./css/bootstrap.min.css')
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean'], function() {
	gulp.start('less', 'typescript');
});

gulp.task('default', ['build'], function() {
	gulp.start('bootstrap', 'html');
});