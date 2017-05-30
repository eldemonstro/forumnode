module.exports = (uri) => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://' + uri);

  mongoose.connection.on('connected', () => {
    console.log(chalk.green('Conectado ao banco de dados MongoDB'));
  });

  mongoose.connection.on('error', (error) => {
    console.log(chalk.red('Erro na conexão: ' + error));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(chalk.green('Disconectado do MongoDB'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(chalk.green('Conexão fechada pelo término da aplicação'));
      process.exit(0);
    });
  });
}
