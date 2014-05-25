'use strict';

module.exports = {
  database: {
    db: 'blog'
  },
  assets: {
    options: {
      maxAge: 24 * 60 * 60 // 24 hours
    },
    styles: ['/dist/styles/styles.css']
  }
};
