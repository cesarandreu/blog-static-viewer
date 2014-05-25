'use strict';

var TABLE = 'posts',
  LIMIT_PER_PAGE = 5;

var thunkify = require('thunkify'),
  marked = require('marked'),
  pygmentize = require('pygmentize-bundled');

marked.setOptions({
  gfm: true,
  highlight: function(code, lang, callback) {
    pygmentize({lang: lang, format: 'html'}, code, function (err, result) {
      callback(err, result);
    });
  }
});
var markedThunk = thunkify(marked);

exports.findPage = function* postFindPage(params) {
  var posts = yield this.app.db.table(TABLE)
                    .orderBy(this.app.db.desc('createdAt'))
                    .skip((params.page - 1) * LIMIT_PER_PAGE)
                    .limit(LIMIT_PER_PAGE)
                    .run();

  return yield posts.toArray();
};

exports.hasMore = function* hasMore(params) {
  return (yield this.app.db.table(TABLE).count().run()) > (LIMIT_PER_PAGE * (params.page));
};

exports.findOne = function* postFindOne(params) {
  return yield this.app.db.table(TABLE).get(params.name).run();
};

exports.getStyledContent = function* getStyledContent(post) {
  // Strips title from content
  // regex: /^#\s.*/
  // ^    : start of string
  // #    : followed by a hashtag
  // \s   : followed by a whitespace
  // .*   : followed by any amount of non-newline characters
  var content = (post.file || '').replace(/^#\s.*/, '');
  return yield markedThunk(content);
};
