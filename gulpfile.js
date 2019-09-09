var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cache = require('gulp-cache'),
    autoPrefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    moment = require('moment');
    // rtlcss = require('gulp-rtlcss'),
    // rename = require('gulp-rename');

    // CSS & JS Banners
const banner = [
  "/**",
  " * @Project        <%= pkg.name %>",
  " * @Author         <%= pkg.author %>",
  " * @Job Title      <%= pkg.jobTitle %>",
  " * @Build          " + moment().format("llll") + " ET",
  " **/",
  ""
].join("\n");
 
 
// concatinat all js files in dist/main.js file
gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
         .pipe(concat('main.js'))
         .pipe(babel({ presets: ['@babel/env']}))
         .pipe(uglify())
         .pipe(header(banner, {pkg: pkg}))
         .pipe(gulp.dest('./dist/js')) 
         .pipe(livereload());
});
// move all html files to dist/ folder
gulp.task('html', () => {
  return gulp.src('./src/*.html')
         .pipe(gulp.dest('./dist')) 
         .pipe(livereload());
});

// concatinat all scss files in dist/main.css file
gulp.task('css', () => {
  return gulp.src('./src/scss/main.scss')
         .pipe(sass({outputStyle: 'compressed'}))
         .pipe(autoPrefix('last 2 versions'))
         .pipe(concat('main.css'))
         .pipe(header(banner, {pkg: pkg}))
         .pipe(gulp.dest('./dist/css')) 
        //  .pipe(rtlcss()) // Convert to RTL.
        //  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
        //  .pipe(gulp.dest('dist/css'))
         .pipe(livereload());
         
});

// Image Optimization Tasks
gulp.task('img', () => {
  return gulp.src('./src/img/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5
    })))
    .pipe(gulp.dest('./dist/img'))
    .pipe(livereload());
});

// watch task
gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch('src/js/**/*.js', gulp.series(['js']));
    gulp.watch('./src/scss/**/*.scss', gulp.series(['css']));
    gulp.watch('./src/img/**/*.+(png|jpg|gif|svg)', gulp.series(['img']));
    gulp.watch('./src/**/*.html', gulp.series(['html']));
  });

