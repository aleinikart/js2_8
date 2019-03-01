let gulp = require('gulp'), // Сам gulp
    sass = require('gulp-sass'), // Компиляция стилей
    minifyJs = require('gulp-terser'), // Минификация js
    autoPrefixer = require('gulp-autoprefixer'), // Вендорные префиксы
    rigger = require('gulp-rigger'),
    bs = require('browser-sync'), // Server
    htmlMin = require('gulp-htmlmin'), // Минификация html
    rename = require('gulp-rename'), //Rename
    concat = require('gulp-concat'), //Rename
    delFiles = require('del'), // Delete files
    cssMinify = require('gulp-csso'), // Minify css
    babel = require('gulp-babel'), // babel
    jsonMinify = require('gulp-json-minify'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');


gulp.task('csslibs', () => {
    return gulp.src('app/sass/**/*.css')
        .pipe(concat('libs.css'))
        .pipe(autoPrefixer())
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('image:build', () =>  {
    return gulp.src('app/img/**/*.*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant()
        ])))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', () => {
    return delFiles('dist');
});


gulp.task('html:build', () => {
    return gulp.src('app/html/*.html')
        .pipe(rigger())
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});



gulp.task('js:es6', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(minifyJs())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
});
gulp.task('json:minify', () => {
    return gulp.src('app/js/**/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js:babel', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({
            suffix: '.es5'
        }))
        .pipe(gulp.dest('dist/js'))
});
gulp.task('server', () => {
    return bs({
        server: {
            baseDir: 'dist'
        },
        browser: 'google chrome'
    })
});

gulp.task('html:watch', () => {
    return gulp.watch('app/**/*.html', gulp.series('html:build', (done) => {
        bs.reload();
        done()
    }))
});

gulp.task('csslibs:watch', () => {
    return gulp.watch('app/sass/**/*.css', gulp.series('csslibs', (done) => {
        bs.reload();
        done()
    }))
});
gulp.task('sass:watch', () => {
    return gulp.watch('app/sass/**/*.scss', gulp.series('sass', (done) => {
        bs.reload();
        done()
    }))
});
gulp.task('js:watch', () => {
    return gulp.watch('app/js/**/*.js', gulp.series('js:es6', (done) => {
        bs.reload();
        done()
    }))
});
gulp.task('json:watch', () => {
    return gulp.watch('app/js/**/*.json', gulp.series('json:minify', (done) => {
        bs.reload();
        done()
    }))
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('sass', 'csslibs', 'image:build', 'html:build', 'js:es6', 'json:minify', 'js:babel'),
    gulp.parallel('sass:watch', 'js:watch', 'html:watch','server')
));
















