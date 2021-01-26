const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const sass = require('gulp-sass')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('clean', async () => del('dist'))
gulp.task('build-ts', async () => tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist')))
gulp.task('build-scss', async () => gulp.src('./public/scss/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./public/css')))

exports.default = gulp.series('clean', 'build-ts', 'build-scss')