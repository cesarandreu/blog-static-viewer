'use strict';
var Router = require('koa-router'),
  postsController = require('./controllers/postsController'),
  aboutController = require('./controllers/aboutController');

module.exports = function() {
  var blog = new Router();

  blog.get('root#index', '/', postsController.index);
  blog.get('posts#index', '/posts', postsController.index);
  blog.get('posts#show', '/posts/:name', postsController.show);
  blog.get('about#index', '/about', aboutController.index);

  // Redirect old links to newer url
  // TODO: test if it works :D
  // blog.get('oldPostsShow', '/post/:name', function *(){
  //   this.redirect(blog.url('postsShow', this.params));
  //   this.status = 301;
  // });
  // blog.redirect('/post/:name', 'postsShow');
  return blog.middleware();
};
