'use strict';

var gulp = require('gulp'),
  path = require('path'),
  config = require('./config');

switch (config.environment) {
  case 'development':
    var nodemon = require('gulp-nodemon');
    var livereload = require('gulp-livereload');
    break;
  case 'production':
    var mincss = require('gulp-minify-css');
    var filelog = require('gulp-filelog');
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
  .on('restart', function (files) {
    if (lr && files.length) {
      setTimeout(function() {
        lr.changed(files[0]);
      }, 100);
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
  console.log('styles', config.assets.glob.styles);
  console.log('build', config.folder.build);
  return gulp
  .src(config.assets.glob.styles, {cwd: config.folder.public})
  .pipe(filelog())
  .pipe(mincss())
  .pipe(gulp.dest(config.folder.build));
});

