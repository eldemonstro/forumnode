const mongoose = require('mongoose');

var api = {};

var model = mongoose.model('Post');
var info = mongoose.model('Info');

api.newPost = (req, res) => {
  console.time('newpost');
  let body = req.body;

  // Check if everything is ok
  req.assert('title', "Titulo é obrigatório").notEmpty();
  req.assert('body', "Conteudo é obrigatório").notEmpty();
  req.assert('author', "Conteudo é obrigatório").notEmpty();
  req.assert('threadId', "Tentativa de postar fora de topico")
    .notEmpty()
    .isInt();

  let errs = req.validationErrors();

  if (errs) {
    console.error(err);
    res.status(400).send(errs);
    return;
  }

  info.findOne({
      info: "counter"
    })
    .then((info) => {
      if (req.params.threadId > info.threadNumber ||
        req.params.threadId < 1) {
        res.status(400).send({
          'error': 'Post number out of range'
        });
        return;
      }

      let postId = info.postNumber++;

      let post = {
        title: body.title,
        author: body.author,
        body: body.body,
        threadId: req.params.threadId,
        postId: postId
      };


      info.save(function(err, info) {
        if (err) {
          console.error(err);
          res.status(500).json(error);
          return;
        };
      });

      model.create(post)
        .then((post) => {
          res.json(post);
        }, (error) => {
          console.error(error);
          res.status(500).json(error);
          return;
        });
    }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
    });
  console.timeEnd('newpost');
};

api.newThread = (req, res) => {
  console.time('newthread');
  let body = req.body;

  // Check if everything is ok
  req.assert('title', "Titulo é obrigatório").notEmpty();
  req.assert('body', "Conteudo é obrigatório").notEmpty();
  req.assert('author', "Conteudo é obrigatório").notEmpty();

  let errs = req.validationErrors();

  if (errs) {
    console.error(err);
    res.status(400).send(errs);
    return;
  }

  info.findOne({
      info: "counter"
    })
    .then((info) => {
      let postId = info.postNumber++;
      let threadId = info.threadId++;

      let post = {
        title: body.title,
        author: body.author,
        body: body.body,
        threadId: threadId,
        postId: postId,
        leadPost: true
      };

      info.save(function(err, info) {
        if (err) {
          console.error(err);
          res.status(500).json(error);
          return;
        };
      });

      model.create(post)
        .then((post) => {
          res.json(post);
        }, (error) => {
          console.error(error);
          res.status(500).json(error);
          return;
        });
    }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
    });
  console.timeEnd('newthread');
}

api.getThread = (req, res) => {
  let threadId = req.params.threadId;
  model.find({
      'threadId': threadId
    })
    .then((posts) => {
      if (posts.length == 0) {
        console.log('aqui');
        res.redirect('/post/thread/notfound');
        return;
      }
      console.log(posts.length);
      res.json(posts);
    }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }
    });
}

module.exports = api;
