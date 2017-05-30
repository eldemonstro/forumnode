module.exports = (app) => {
  var api = app.api.forum;
  app.get('/', (req, res) => {
    res.send('OK!');
  });

  app.get('/topics', api.mostViewTopics);
};
