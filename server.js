const http = require('http');
const app = require('./config/express');
require('./config/database')('localhost/nodeforum');
chalk = require('chalk');
const mongoose = require('mongoose');

http.createServer(app)
  .listen(3000, () => {
    console.log(chalk.green('Escutando na porta 3000'));
  });
