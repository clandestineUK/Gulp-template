const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('default', ['copyHtml','minify','compileSass','copySvg','browser-sync']);

///Copy html files to dist
gulp.task('copyHtml',function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});
//Copy svg to dist
gulp.task('copySvg', function(){
    gulp.src('src/svg/*.svg')
    .pipe(gulp.dest('dist/svg'));
});
///Uglify JS files
gulp.task('minify', function(){
  gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

///Compile Sass into css
gulp.task('compileSass', function(){
  gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'));
});

///Run browser syncx
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }   
    });
    gulp.watch('src/*.html',['copyHtml']).on('change', browserSync.reload);
    gulp.watch('src/svg/*.svg',['copySvg']).on('change', browserSync.reload);
    gulp.watch('src/styles/*.scss',['compileSass']).on('change', browserSync.reload);
    gulp.watch('src/scripts/*.js',['minify']).on('change', browserSync.reload);
});
