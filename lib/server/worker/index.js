var http = require('http');
var util = require('util');

module.exports = function(app) {

  var options = app.settings.server;

  app.server = http.createServer(app);
  app.server.listen(options.port, options.ip, function() {
    console.log(util.format('listening on %s %s', options.ip, options.port));
  });

  require('./images')(app);

  require('./messages')(app);

};
