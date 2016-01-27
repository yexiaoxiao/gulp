var gulp = require('gulp'),  
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    spriter = require('gulp-css-spriter'), //雪碧图
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
return  gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/sprite/'))
    .pipe(gulp.dest('src/sprite'));
});

gulp.task('sprite',function() {
    var timestamp = +new Date();
    //需要自动合并雪碧图的样式文件
    return gulp.src('./src/sprite/*.css')
        .pipe(spriter({
            // 生成的spriter的位置
            'spriteSheet': './dist/assets/images/sprite'+timestamp+'.png',
            // 生成样式文件图片引用地址的路径
            // 如下将生产：backgound:url(../images/sprite20324232.png)
            'pathToSpriteSheetFromCSS': '../images/sprite'+timestamp+'.png'
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        //产出路径
        .pipe(gulp.dest('./dist/assets/css'));
});
 

// js压缩
gulp.task('scripts', function() {  
  return gulp.src('src/scripts/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))

    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 图片压缩
gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 收拾乾淨!  在我们进行佈署之前，清除目的地目录并重建档案是一个好主意–以防万一任何已经被删除的来源档案遗留在目的地目录之中:
gulp.task('clean', function() {  
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'src/sprite', 'dist/assets/images'], {read: false})
    .pipe(clean());
});

// 预设任务   我们可以建立一个预设任务，当只输入$ gulp指令时执行的任务，这裡执行三个我们所建立的任务:

gulp.task('default', ['clean','sass'], function() {  
    gulp.start( 'scripts','sprite'); //图片未压缩
});

// 看守  为了能够看守档案，并在更动发生后执行相关任务，首先需要建立一个新的任务，使用gulp.watchAPI来看守档案:
gulp.task('watch', function() {

  // 看守所有.scss档
    gulp.watch('src/css/*.scss', ['sass']);

    // 看守所有css文档
    gulp.watch('src/sprite/*.css',['sprite']);

  // 看守所有.js档
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);

});

var cssSprite = require('gulp-css-spritesmith');
gulp.task('autoSprite', function() {
    gulp.src('src/css/sprite.css').pipe(cssSprite({
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: 'src/images/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'dist/images/',
        // 替换后的背景路径，默认 ../images/
        spritepath: 'dist/images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true
    }))
    .pipe(gulp.dest('dist/'));
});
