var https   = require('https');
var express = require('express');

var app = express();

require('./config')(app);

require('./engine')(app);

require('./router')(app);

require('./static')(app);

require('./cluster')(app);

module.exports = app;
