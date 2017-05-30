const mongoose = require('mongoose');

var api = {};

var model = mongoose.model('Post');

api.newPost = (req, res) => {
  let body = req.body;

  if (!req.params.threadId) {
    console.log(chalk.red("tentativa de postagem invalida"));
  }

  // Check if everything is ok
  req.assert('title', "Titulo é obrigatório").notEmpty();
  req.assert('body', "Conteudo é obrigatório").notEmpty();
  req.assert('author', "Conteudo é obrigatório").notEmpty();
  req.assert('threadId', "Tentativa de postar fora de topico")
    .notEmpty()
    .isInt();

  let errs = req.validationErrors();

  if (errs) {
    console.log(chalk.red("Erros de validação encontrados"));
    res.status(400).send(errs);
    return;
  }

  // Criar o objeto
  let post = {
    title: body.title,
    author: body.author,
    body: body.body,
    thread: req.params.threadId
  };

  model.create(post)
    .then((post) => {
      res.json(post);
    }, (error) => {
      console.error(error);
      res.status(500).json(error);
    });

  console.log(post);

  res.json(body);
};

module.exports = api;
