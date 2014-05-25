'use strict';

var _ = require('lodash'),
  Posts = require('../models/post');

exports.index = function* postIndex() {
  this.query.page = parseInt(this.query.page, 10);
  this.params.page = this.locals.page = this.query.page > 0 ? this.query.page : 1;
  this.locals.posts = yield Posts.findPage.call(this, this.params);
  this.locals.hasMorePosts = yield Posts.hasMore.call(this, this.params);
  this.locals.title = _.contains(this.req.url, '/posts') ? 'Page ' + this.params.page : 'not a blog';

  yield this.render('posts/index');
};

exports.show = function* postShow() {
  this.locals.post = yield Posts.findOne.call(this, this.params);
  if (this.locals.post) {
    this.locals.post.content = yield Posts.getStyledContent(this.locals.post);
    this.locals.title = this.locals.post.title;
  } else {
    this.locals.status = this.status = 404;
    this.locals.message = 'Post not found';
  }
  yield this.render('posts/show');
};
