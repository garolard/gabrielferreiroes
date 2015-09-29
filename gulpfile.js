var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function() {
	return gulp.src(['./less/**/*.less'])
		.pipe(less({
			paths: [ path.join(__dirname, 'less') ]
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('typescript', function(){
	return gulp.src(['./ts/declarations/**/*.ts', './ts/**/*.ts'])
		.pipe(sourcemaps.init())
		.pipe(ts({
			declarationFiles : false,
			noExternalResolve : true
		}))
		.pipe(sourcemaps.write('./dist/maps'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['less', 'typescript', 'html']);