var autoprefix = require("gulp-autoprefixer"),
    connect = require("gulp-connect"),
    gulp = require("gulp"),
    bourbon = require("bourbon").includePaths,
    sass = require("gulp-sass");

var paths = {
    scss: ["sass/*.scss"]
};

gulp.task("sass", function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            sourcemaps: true,
            includePaths: bourbon
        }))
        .pipe(autoprefix("last 2 versions"))
        .pipe(gulp.dest("public/stylesheets"))
        .pipe(connect.reload());
});

gulp.task('icons', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('public/webfonts/'));
});

gulp.task("connect", function () {
    connect.server({
        root: "public",
        port: 8000,
        livereload: true
    });
});

gulp.task("default", ["sass", "connect", "icons"], function () {
    gulp.watch(paths.scss, ["sass"]);
});