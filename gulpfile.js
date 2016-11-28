var gulp = require("gulp");
var watch = require("gulp-watch");

var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var del = require("del");
var minifyCSS = require("gulp-minify-css");
var copy = require("gulp-copy");
var bower = require("gulp-bower");
var sourcemaps = require("gulp-sourcemaps");
var templates = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var minifyHTML = require('gulp-minify-html');
var gulpif = require('gulp-if');
   
var path = {
    src: "bower_components/",
    lib: "build/lib/",
	app: "build/app/"
}
   
var config = {
    jquerysrc: [
        path.src + "jquery/dist/jquery.js",
		//path.src + "bootstrap/dist/js/bootstrap.js",
		path.src + "toastr/toastr.js",
		path.src + "fastclick/lib/fastclick.js",
		path.src + "components-modernizr/modernizr.js",
		path.src + "perfect-scrollbar/js/perfect-scrollbar.jquery.js"
    ],
    jquerybundle: path.lib + "jquery-bundle.js",
    ngsrc: [
        path.src + "angular/angular.js",
         path.src + "angular-ui-router/release/angular-ui-router.js",
         path.src + "angular-touch/angular-touch.js",
		 path.src + "angular-base64/angular-base64.js",
		 path.src + "angular-sanitize/angular-sanitize.js",
		 path.src + "angular-cookies/angular-cookies.js",
		 path.src + "ngstorage/ngStorage.js",
		 path.src + "oclazyload/dist/ocLazyLoad.js",
		 path.src + "angular-breadcrumb/dist/angular-breadcrumb.js",
		 path.src + "angular-resource/angular-resource.js",
		 path.src + "angular-translate/angular-translate.js",
		 path.src + "angular-translate-loader-url/angular-translate-loader-url.js",
		 path.src + "angular-translate-loader-static-files/angular-translate-loader-static-files.js",
		 path.src + "angular-translate-storage-local/angular-translate-storage-local.js",
		 path.src + "angular-translate-storage-cookie/angular-translate-storage-cookie.js",
		 path.src + "angular-bootstrap/ui-bootstrap-tpls.js",
		 path.src + "angular-loading-bar/build/loading-bar.js",
		 path.src + "angular-scroll/angular-scroll.js"
    ],
    ngbundle: path.lib + "ng-bundle.js",
    miscsrc: [
        path.src + "underscore/underscore.js"
    ],
    miscsrcbundle: path.lib + "misc-bundle.js"
}

gulp.task("clean-scripts", function (cb) {
    del(["build","dist", "tmp"], cb);
});

gulp.task("bower-restore", function () {
    return bower();
});

//Create a jquery bundled file
gulp.task("jquery-bundle", function () {
    return gulp.src(config.jquerysrc)
     .pipe(concat("jquery-bundle.js"))
     .pipe(gulp.dest('./build/lib/'));
});

//Create a angular bundled file
gulp.task("ng-bundle", function () {
    return gulp.src(config.ngsrc)
     .pipe(concat("ng-bundle.js"))
     .pipe(gulp.dest('./build/lib/'));
});

//Create a angular bundled file
gulp.task("misc-bundle", function () {
    return gulp.src(config.miscsrc)
     .pipe(concat("misc-bundle.js"))
     .pipe(gulp.dest('./build/lib/'));
});

gulp.task("bundle-lib", ["jquery-bundle", "ng-bundle", "misc-bundle"], function () {

});

//Create a iprime-utility
gulp.task("iprime-utility", function () {
[
  '/src/app/iprimeUtility/**/!(foobar)*.js', // all files that end in .js EXCEPT foobar*.js
  '/src/js/foobar.js',
]
    return gulp.src("./src/app/iprimeUtility/**/*.js")
     .pipe(concat("iprimeUtility.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task("iprime-core", function () {
    return gulp.src(["./src/app/core/**/*.js","./src/app/core/*.js"])
     .pipe(concat("iprimeCore.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task("iprime-dashboard", function () {
    return gulp.src(["./src/app/dashboard/**/*.js","./src/app/dashboard/*.js"])
     .pipe(concat("iprimeDashboard.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task("iprime-system", function () {
    return gulp.src(["./src/app/system/**/*.js","./src/app/system/*.js"])
     .pipe(concat("iprimeSystem.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task("iprime-ereport", function () {
    return gulp.src(["./src/app/ereport/**/*.js","./src/app/ereport/*.js"])
     .pipe(concat("iprimeReport.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task('templates', function () {
  gulp.src([
	'./src/**/!(index)*.html' // all files that end in .js EXCEPT foobar*.js

    ])
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('tmp'));
});

gulp.task("iprimeTemplate",["templates"], function () {
    return gulp.src(["./src/app/templates/**/*.js","./src/app/templates/*.js","./tmp/templates.js" ])
     .pipe(concat("iprimeTemplate.js"))
     .pipe(gulp.dest('./build/app/'));
});

gulp.task("iprime", function () {
    return gulp.src("./src/app/*.js")
     .pipe(concat("iprime.js"))
     .pipe(gulp.dest('./build/app/'));
});





gulp.task("bundle-app", ["iprime","iprime-utility", "iprime-core", "iprime-dashboard", "iprime-system", "iprime-ereport","iprimeTemplate"], function () {

});


gulp.task("compile-lib", ["bundle-lib"], function () {
    return gulp.src("build/lib/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("compiled-bundle.js"))
        .pipe(gulp.dest("dist/lib"))
        .pipe(rename("compiled-bundle.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/lib"));
});

gulp.task("compile-app", ["bundle-app"], function () {
    return gulp.src("build/app/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("compiled-app.js"))
        .pipe(gulp.dest("dist/lib"))
        .pipe(rename("compiled-app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/app"));
});

gulp.task('html', function () {
    var assets = useref.assets();
 
     return gulp.src('src/index.html')
        .pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('build'));
});
