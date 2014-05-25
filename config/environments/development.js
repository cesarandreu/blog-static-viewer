'use strict';

module.exports = {
  database: {
    db: 'blog_development'
  },
  views: {
    cache: false
  },
  assets: {
    options: {
      buffer: false
    },
    // Order matters
    styles: [
      '/styles/pure.css',
      '/styles/pure.grids-responsive.css',
      '/styles/theme.css',
      '/styles/syntax-highlighting.css'
    ]
  }
};
