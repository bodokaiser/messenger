var http = require('http');

module.exports = function(app) {

  var options = app.settings.server;

  app.server = http.createServer(app);
  app.server.listen(options.port);

};
