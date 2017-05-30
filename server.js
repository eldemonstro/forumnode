const path = require('path');
const http = require('http');
const app = require(path.join(__dirname, 'config/express'));
require('./config/database')('localhost/nodeforum');
chalk = require('chalk');

http.createServer(app)
  .listen(3000, () => {
    console.log(chalk.green('Escutando na porta 3000'));
  });
