module.exports = (app) => {
  var api = app.api.post;
  app.route('/post/newPost/:threadId')
    .post(api.newPost);
  app.route('/post/newThread')
    .post(api.newThread);
  app.route('/post/thread/:threadId')
    .get(api.getThread);
};
