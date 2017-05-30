module.exports = (app) => {
  var api = app.api.post;
  app.route('/post/newPost/:threadId')
    .post(api.newPost);
};
