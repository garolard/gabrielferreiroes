var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");

gulp.task("typescript", function(){
	gulp.src(["./ts/declarations/**/*.ts", "./ts/**/*.ts"])
		.pipe(sourcemaps.init())
		.pipe(ts({
			declarationFiles : false,
			noExternalResolve : true
		}))
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest('./js'));
});

gulp.task("default", ["typescript"]);