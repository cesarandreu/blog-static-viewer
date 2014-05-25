'use strict';

var _ = require('lodash'),
  path = require('path'),
  // glob = require('glob'),
  options = {
    logs: path.resolve(process.env.LOGDIR || process.env.HOME, 'blog-static.log'),
    database: {
      host: 'localhost',
      port: 28015
    },
    port: process.env.PORT || 3000,
    environment: (process.env.NODE_ENV || 'development').toLowerCase(),
    folder: {
      root: path.resolve(module.filename, '../..'),
      public: path.resolve(module.filename, '../../public'),
      build: path.resolve(module.filename, '../../public/dist'),
      app: path.resolve(module.filename, '../../app'),
      controller: path.resolve(module.filename, '../../app/controller'),
      models: path.resolve(module.filename, '../../app/models'),
      views: path.resolve(module.filename, '../../app/views')
    },
    views: {
      default: 'jade',
      cache: true
    },
    assets: {
      options: {
        gzip: true,
        buffer: true
      },
      styles: [
        '/styles/pure.css',
        '/styles/grids-responsive.css',
        '/styles/blog.css',
        '/styles/syntax-highlighting.css'
      ],
      glob: {
        styles: 'styles/*.css'
      }
    }
  };

_.merge(options, require('./environments/' + options.environment));
// options.assets.styles = glob.sync(options.assets.glob.styles, {
//   cwd: options.folder.public
// });

module.exports = options;
