var http    = require('http');
var express = require('express');

var app = express();

require('./config')(app);

require('./engine')(app);

require('./security')(app);

require('./router')(app);

require('./static')(app);

require('./cluster')(app);

require('./socket')(app);

module.exports = app;
