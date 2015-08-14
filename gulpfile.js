var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var path = require("path");

gulp.task("less", function() {
	return gulp.src(["./less/**/*.less"])
		.pipe(less({
			paths: [ path.join(__dirname, 'less') ]
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task("typescript", function(){
	return gulp.src(["./ts/declarations/**/*.ts", "./ts/**/*.ts"])
		.pipe(sourcemaps.init())
		.pipe(ts({
			declarationFiles : false,
			noExternalResolve : true
		}))
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest('./js'));
});

gulp.task("default", ["less", "typescript"]);