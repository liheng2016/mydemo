var  gulp     = require('gulp'),
	 gutil    = require('gulp-util'),
	 jshint	  = require('gulp-jshint'),//js����У��
	 uglify   = require('gulp-uglify'),//jsѹ��
	 cssmin   = require('gulp-minify-css'),//cssѹ��
	 concat   = require('gulp-concat'),//�ļ��ϲ�
	 imagemin = require('gulp-imagemin'),//ͼƬѹ��
	 cache    = require('gulp-cache'),
	 rename    = require('gulp-rename'),//������
	 notify   = require('gulp-notify');//֪ͨ
	 clean    = require('gulp-clean');//�����ļ�
	 htmlmin  = require('gulp-htmlmin');//htmlѹ��

//Դ��Ŀ¼
var SOURCE="src/";
//���Ŀ¼
var DEST="dist/";


//HTML�ļ�
gulp.task('html', function() {
   gulp.src(SOURCE+"/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(DEST))
	    .pipe(notify({message:'html task success'}))
});


//�ű��ļ�
gulp.task('js', function () {
    gulp.src(SOURCE+'/js/*.js')
		//�ϲ�js
		.pipe(concat("app.js"))
		//���δѹ���汾
		.pipe(gulp.dest(DEST+"/js"))
		//ѹ��
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DEST+'/js/'))
		.pipe(notify({message:'js task success'}));
});
//��ʽ
gulp.task('css', function () {
    gulp.src(SOURCE+'/css/*.css')
		//�ϲ�css
		.pipe(concat('style.css'))
		//���δѹ���İ汾
		.pipe(gulp.dest(DEST+"/css"))
		//ѹ��
		.pipe(cssmin())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST+'/css/'))
		.pipe(notify({message:"css tsak success"}));
});
//ͼƬ
gulp.task('image', function() { 
  return gulp.src(SOURCE+'/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(DEST+'/images'))
    .pipe(notify({ message: 'images task success' }));
});


// ����
gulp.task('clean', function() { 
  return gulp.src([DEST+'/css', DEST+'/js', DEST+'/images'], {read: false})
    .pipe(clean())
	.pipe(notify({message:'clean  task  success!!!'}));
});
 
// Ԥ������
gulp.task('default', ['clean'], function() { 
    gulp.start('js', 'css', 'image','html');
});

 