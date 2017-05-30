const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var app = express();

// Express middlewares
// Static MW
app.use(express.static('./public'));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Validator MW
app.use(expressValidator());

// Secret
app.set('secret', 'ultramandalusz');

consign({
    cwd: 'app'
  })
  .include('models')
  .then('api')
  .then('routes')
  .into(app);

// Exporting express object
module.exports = app;
