//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    minifyCss = require('gulp-minify-css'),
    spriter = require('gulp-css-spriter'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    tinypng = require('gulp-tinypng'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    zip = require('gulp-zip'),
    plumber = require('gulp-plumber'), //此工具可以防止watch因为报错而终止监听
    revAppend = require('gulp-rev-append'),
    clean = require('gulp-clean'),
    config = require('./config.json');


//借用tinypng 的官方API 进行压缩，支持png、jpg 格式
gulp.task('tinypng', function() {
    return gulp.src('src/pngtest/**/*.png')
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(tinypng('S-1bq_RSFTWXpaGApvR1GIPqX4pfh9ZO'))
            .pipe(gulp.dest('dist/pngtest'));
});


//上传到远程服务器任务
//经测试，gulp-ftp只能上传前三级目录下的文件
//解决办法：分段上传，如下 uploadImages360 、uploadImages 、upload
gulp.task('upload', ['uploadImages'], function () {
    return gulp.src(['dist/**/*', '!dist/img/**/*'])
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            port: config.ftp.port,
            pass: config.ftp.pass,
            remotePath: config.ftp.remotePath
        }))
        .pipe(gutil.noop()); //在ftp上传完后输出 * files uploaded successfully
});
gulp.task('uploadImages', function () {
    return gulp.src('dist/img/**/*')
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            port: config.ftp.port,
            pass: config.ftp.pass,
            remotePath: config.ftp.remotePath + 'img/'
        }))
        .pipe(gutil.noop()); //在ftp上传完后输出 * files uploaded successfully
});


//打包主体build 文件夹并按照时间重命名
gulp.task('zip', function(){
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d=new Date();
    var year=d.getFullYear();
    var month=checkTime(d.getMonth() + 1);
    var day=checkTime(d.getDate());
    var hour=checkTime(d.getHours());
    var minute=checkTime(d.getMinutes());

    return gulp.src('dist/**')
        .pipe(zip( config.project+'-'+year+'-'+month+'-'+day+'-'+hour+'.'+minute+'.zip'))
        .pipe(gulp.dest('zips/'));
});


///////////////////////////////////////////////////////////////////////////
gulp.task('cleanSprite', function () {
    return gulp.src('dist/img/common/sprite*.png', {read: false})
        .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
        .pipe(clean());
});
//合并多个css并压缩成all.min.css文件
gulp.task('concatCss', ['cleanSprite'], function() {
    var timestamp = +new Date();
    return gulp.src('src/css/*.css')
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(spriter({
                // 生成的spriter的位置
                'spriteSheet': 'dist/img/common/sprite'+timestamp+'.png',
                // 生成样式文件图片引用地址的路径
                // 如下将生产：backgound:url(../images/sprite20324232.png)
                'pathToSpriteSheetFromCSS': '../img/common/sprite'+timestamp+'.png'
            }))
            .pipe(concat('style.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/css'));
});

//合并多个js并压缩成all.js文件
gulp.task('concatJs', function() {
    return gulp.src([
        'src/js/webscale.js', 'src/js/zepto.min.js', 'src/js/lazyloading.js',
        'src/js/touch.js', 'src/js/fx.js', 'src/js/cssSprite.js',
        'src/js/selectdata.js', 'src/js/provincecity.js', 'src/js/server.js',
        'src/js/index.js'
    ])
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(concat('all.js'))
            .pipe(minify()) //此处会生成两个文件，分别是压缩版和未压缩版
            .pipe(gulp.dest('src/js'));
});

gulp.task('copyJs', ['concatJs'], function() {
    return gulp.src('src/js/all-min.js')
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(gulp.dest('dist/js'));
});

//给html页面的url加版本号，以清除页面缓存
gulp.task('revAppendHtml', function() {
    return gulp.src('src/html/*.html')
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(revAppend())
            .pipe(gulp.dest('dist/html'));
});

gulp.task('copyImages', function () {
    return gulp.src(['src/img/**/*', '!src/img/common/icon/*'])
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(gulp.dest('dist/img'));
});
gulp.task('copyMedia', function () {
    return gulp.src('src/media/*')
            .pipe(plumber()) //plumber给pipe打补丁防止watch因报错而终止监听
            .pipe(gulp.dest('dist/media'));
});

//定义默认任务
gulp.task('default', ['concatCss', 'copyJs', 'revAppendHtml', 'copyImages', 'copyMedia']);

//自动监听任务
gulp.task('watchCss', function () {
    gulp.watch('src/css/*.css', ['concatCss']);
});
gulp.task('watchHtml', function () {
    gulp.watch('src/html/*.html', ['revAppendHtml']);
});
gulp.task('watchImages', function () {
    gulp.watch('src/img/**/*', ['copyImages']);
});
gulp.task('watchConcatJs', function () {
    gulp.watch(['src/js/**/*.js', '!src/js/all.js', '!src/js/all-min.js'], ['concatJs']);
});
gulp.task('watchCopyJs', function () {
    gulp.watch('src/js/all-min.js', ['copyJs', 'revAppendHtml']);
});
gulp.task('watchMedia', function () {
    gulp.watch('src/media/*', ['copyMedia']);
});

gulp.task('watchs', ['watchCss', 'watchConcatJs', 'watchHtml', 'watchCopyJs', 'watchImages', 'watchMedia']);


//gulp.task('default', ['concatJs', 'build']);//定义默认任务
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径