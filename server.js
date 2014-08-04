'use strict';

var koa = require('koa'),
  views = require('koa-views'),
  staticCache = require('koa-static-cache'),
  rethinkdb = require('rethinkdbdash-unstable'),
  routes = require('./app/routes'),
  config = require('./config'),
  app = koa();

app.name = 'blog-viewer-static';
app.init = function () {
  app.assets = {
    styles: config.assets.styles
  };
  app.config = config;
  app.db = rethinkdb(config.database);
  app.env = config.environment;
  switch (app.env) {
    case 'development':
      app.use(require('koa-logger')());
      app.use(require('koa-livereload')());
      break;
    case 'production':
      app.use(require('koa-gzip')());
      app.use(require('koa-fresh')());
      app.use(require('koa-etag')());
      app.use(require('koa-log4js')({
        file: require('path').relative(config.folder.root, config.logs)
      }));
      break;
  }
  app.use(views(config.folder.views, config.views));
  app.use(staticCache(config.folder.public, config.assets.options));
  app.use(function* (next) {
    this.locals.styles = this.app.assets.styles;

    try {
      yield next;
    } catch (err) {
      err.code = err.code || 500;
      err.message = err.message || 'server error';
      this.code = err.code;
      this.locals.error = err;
      yield this.render('error');
    }
  });
  app.use(routes());
  app.listen(config.port, function () {
    console.info(app.name, 'listening on port', config.port, 'in', config.environment, 'environment');
  });
};

exports.app = app;
exports.config = config;
if (!module.parent) {
  app.init();
}
