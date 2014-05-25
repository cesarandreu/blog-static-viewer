'use strict';

exports.index = function* aboutIndex() {
  this.locals.title = 'About';
  yield this.render('about/index');
};
