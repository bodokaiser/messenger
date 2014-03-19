var http = require('http');

module.exports = function(app) {

  var options = app.settings.server;

  app.httpServer = new http.Server(app);
  app.httpServer.listen(options.port);

};
