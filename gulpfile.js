var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');

var dgModalModuleSrc = [
  './src/_dg_modal.js',
  './src/includes/include.*.js',
  './src/widgets/widget.*.js'
];

var dgModalCssSrc = ['./css/*.css'];

// Task to build the cw_app.min.js file.
gulp.task('minifyJS', function(){
  return gulp.src(dgModalModuleSrc)
      .pipe(gp_concat('concat.js'))
      .pipe(gulp.dest(''))
      .pipe(gp_rename('dg_modal.min.js'))
      .pipe(gp_uglify())
      .pipe(gulp.dest(''));
});

// Task to build the dg_modal.min.css file.
gulp.task('minifyCSS', function(){
  gulp.src(dgModalCssSrc)
      .pipe(gp_concat('concat.css'))
      .pipe(gulp.dest(''))
      .pipe(gp_rename('dg_modal.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(''));
});

gulp.task('default', function () {
  watch(dgModalModuleSrc, function(event) { gulp.start('minifyJS') });
  watch(dgModalCssSrc, function(event) { gulp.start('minifyCSS') });
  gulp.start(['minifyJS', 'minifyCSS']);
});
