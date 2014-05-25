'use strict';

var gulp = require('gulp'),
  path = require('path'),
  config = require('./config');

switch (config.environment) {
  case 'development':
    var nodemon = require('gulp-nodemon');
    var livereload = require('gulp-livereload');
    var openurl = require('openurl');
    var url = require('url');
    break;
  case 'production':
    var mincss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    break;
}

var lr;
gulp.task('serve', ['livereload'], function () {
  nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony'],
    env: {
      NODE_ENV: 'development'
    },
    ignore: ['node_modules/**', '.git']
  })
  .on('start', function() {
    setTimeout(function() {
      openurl.open(url.format({
        protocol: 'http',
        hostname: 'localhost',
        port: config.port
      }));
    }, 250);
  })
  .on('restart', function (files) {
    if (lr && files.length) {
      setTimeout(function() {
        lr.changed(files[0]);
      }, 250);
    }
  });
});

gulp.task('livereload', function () {
  lr = livereload();
  gulp.watch([
    path.resolve(config.folder.public, config.assets.glob.styles),
    path.resolve(config.folder.views, '**/*')
  ])
  .on('change', function(file) {
    lr.changed(file.path);
  });
});

gulp.task('build', function () {
  return gulp
  .src(config.assets.glob.styles, {cwd: config.folder.public})
  .pipe(mincss())
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('dist/styles', {cwd: config.folder.public}));
});
