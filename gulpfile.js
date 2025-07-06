import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

// Chemins
const paths = {
  scss: './src/styles/style.scss',
  dest: './public/css',
  watch: './src/styles/**/*.scss'
};

// Compile SCSS → CSS minifié
export function styles() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'style', suffix: '.min' }))
    .pipe(gulp.dest(paths.dest));
}

// Surveille les fichiers
export function watch() {
  gulp.watch(paths.watch, styles);
}

// Tâche par défaut
export default gulp.series(styles, watch);
