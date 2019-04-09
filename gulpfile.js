var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rubySass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyimage = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
	reload = browserSync.reload;

// Compiling Sass
gulp.task('sass', function(){
    return gulp.src('scss/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('app/css'))
      .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
      .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({
            stream: true
        }))
  });

  // Javascript Task
gulp.task('scripts', function () {
        gulp.src('js/**/*.js')
		.pipe(concat('bundle.js'))
        .pipe(rename({
            suffix: '.min'
        }))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
        .pipe(reload({
			stream: true
		}));
});

// html task
gulp.task('html', function () {
	gulp.src('**/*.html', ['html'])
		.pipe(reload({
			stream: true
		}));

});

// optimize images
gulp.task('imageOptimize', function () {
    gulp.src('images/*')
        .pipe(minifyimage())
        .pipe(gulp.dest('app/images'))
    });

//minify css
gulp.task('minify-css', function () {
	gulp.src(['app/css/**/*.css'])
		.pipe(minifycss({
			keepBreaks: false
		}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html', ['html']);
    gulp.watch('js/**/*.js', ['scripts']);
	// gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	});

});


// Default
gulp.task('default', ['sass', 'html', 'browser-sync', 'minify-css', 'scripts', 'imageOptimize', 'watch']);