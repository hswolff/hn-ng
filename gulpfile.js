'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var watchify = require('watchify');
var browserify = require('browserify');
var to5Browserify = require('6to5-browserify');
var browserifyNgannotate = require('browserify-ngannotate');
var notifier = require('node-notifier');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/main.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

gulp.task('scripts-jshint', function () {
    return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

gulp.task('scripts-build', ['scripts-jshint'], function() {
    var browserified = transform(function(filename) {
      return browserify(filename)
        .transform(to5Browserify)
        .transform(browserifyNgannotate)
        .bundle();
    });

    gulp.src(['./app/main.js'])
        .pipe(browserified)
        .pipe($.uglify())
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('ngtemplates', function () {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe($.angularTemplatecache({
            module: 'hn-ng',
            root: '/',
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts-build'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('scripts-and-templates', ['html', 'scripts-build', 'ngtemplates'], function () {
    return gulp.src([
            '.tmp/main.js',
            '.tmp/templates.js'
        ])
        .pipe($.concat('main.js'))
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src(mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del(['.tmp', 'dist'], cb);
});

gulp.task('build', ['scripts-and-templates', 'html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('.tmp'))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    if ($.util.env.open) {
        require('opn')('http://localhost:9000');
    }
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./app/main.js', _.extend({
    debug: true
  }, watchify.args)));

  var broken = false;
  var needsFixed = false;

  bundler.transform(to5Browserify);
  bundler.transform(browserifyNgannotate);

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', function(err) {
        $.util.log(err);
        notifier.notify({
          'title': 'watchify',
          'message': 'build error!'
        });
        broken = true;
      })
      .on('end', function() {
        if (broken) {
          needsFixed = true;
        } else if (needsFixed) {
          notifier.notify({
            'title': 'watchify',
            'message': 'fixed!'
          });
          needsFixed = false;
        }
        broken = false;
      })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./.tmp/'));
  }

  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('watch', ['connect', 'serve', 'watchify'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/**/*.html',
        '.tmp/**/*.css',
        '.tmp/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/**/*.less', ['styles']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('deploy', ($.util.env.build === false ? [] : ['build']), function (cb) {
    gulp.src('dist')
        .pipe($.subtree())
        .on('end', function() {
            del(['dist'], cb);
        });
});
