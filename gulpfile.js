const gulp = require("gulp");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const purgecss = require("gulp-purgecss");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const jsImport = require("gulp-js-import");
const sourcemaps = require("gulp-sourcemaps");
const htmlPartial = require("gulp-html-partial");
const clean = require("gulp-clean");
const isProd = process.env.NODE_ENV === "prod";

// const htmlFile = ["src/*.html"];

// function html() {
//   return gulp
//     .src(htmlFile)
//     .pipe(
//       htmlPartial({
//         basePath: "src/partials/",
//       })
//     )
//     .pipe(
//       gulpIf(
//         isProd,
//         htmlmin({
//           collapseWhitespace: true,
//         })
//       )
//     )
//     .pipe(gulp.dest("dist"));
// }

function css() {
  return gulp
    .src("src/assets/scss/global/global.scss")
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        supports: true,
        grid: "autoplace",
        remove: false,
      })
    )
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpIf(isProd, cssmin()))
    .pipe(gulp.dest("dist/assets/css/"))
    .pipe(gulp.dest("public/assets/css/"));
}

function remixIcons() {
  return gulp
    .src("src/assets/fonts/RemixIcon/*")
    .pipe(gulp.dest("dist/assets/fonts/remixIcon/"))
    .pipe(gulp.dest("public/assets/fonts/remixIcon/"));
}

gulp.task("purgecss", () => {
  return gulp
    .src("dist/assets/css/*.css")
    .pipe(
      purgecss({
        content: ["public/**/*.html"],
      })
    )
    .pipe(gulp.dest("dist/assets/css"));
});
gulp.task("purgeIconcss", () => {
  return gulp
    .src("dist/assets/fonts/remixIcon/*.css")
    .pipe(
      purgecss({
        content: ["public/**/*.html"],
      })
    )
    .pipe(gulp.dest("dist/assets/fonts/remixIcon"));
});

function js() {
  return gulp
    .src("src/assets/js/*.js")
    .pipe(
      jsImport({
        hideConsole: true,
      })
    )
    .pipe(gulp.dest("dist/assets/js"))
    .pipe(gulp.dest("public/assets/js"));
}

function img() {
  return gulp
    .src("src/assets/images/**/*.*")
    .pipe(gulp.dest("dist/assets/images/"))
    .pipe(gulp.dest("public/assets/images/"));
}

function serve() {
  browserSync.init({
    open: true,
    server: "./dist",
  });
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  // gulp.watch("src/**/*.html", gulp.series(html, browserSyncReload));
  gulp.watch(
    "src/assets/scss/global/*.scss",
    gulp.series(css, browserSyncReload)
  );
  gulp.watch("src/**/*.js", gulp.series(js, browserSyncReload));
  gulp.watch("src/assets/images/*.*", gulp.series(img));

  return;
}

function del() {
  return gulp.src("dist/*", { read: false }).pipe(clean());
}

// exports.html = html;
exports.js = js;
exports.css = css;
exports.remixIcons = remixIcons;
exports.del = del;
exports.serve = gulp.parallel(
  // html,
  js,
  css,
  remixIcons,
  img,
  watchFiles,
  serve
);
// exports.default = gulp.series(del, html, js, css, remixIcons, img);
exports.default = gulp.series(del, js, css, remixIcons, img);
