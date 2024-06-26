const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create()
var sourcemaps = require('gulp-sourcemaps')

const source = {
  style: './assets/scss/**/*.scss',

  mainsass: './assets/scss/main.scss',

  minsass: './assets/css/main.min.css',
  allbuild: './dist/**/',
  build: './dist/'
}

const destination = {
  style: './assets/css/'
}


//Task is to compile sass code to css files
gulp.task('sass', done => {
  return gulp.src(source.mainsass)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(destination.style))
  .pipe(browserSync.reload({
    stream: true
  }))

  done => done()
})

//This task is to open the project into the browser
//and can access by all the device with the same network
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})


//Run this task when your developing
gulp.task('default', gulp.series(
  gulp.parallel(
    'sass',
    'browserSync')
), done => done()
)


/////////////////////////
///////Build Task////////
/////////////////////////


//Task is to compile sass to css and minify the css file
gulp.task('minsass', done => {
  return gulp.src(source.mainsass)
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./dist/css/'))

  done => done()
})


//This task opens browser sync for built project
gulp.task('build:browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})


//Run this task for building project
gulp.task('build', gulp.series(
  // 'build:clear',
  'minsass',
  'build:browserSync'
),done => done()
)
