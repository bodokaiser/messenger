var Server = require('./server');

module.exports = function(app) {

  var server = new Server({
    url: '/messages'
  });

  server.on('connect', function(socket) {
    socket.id = server.connections.length;

    var response = JSON.stringify({
      head: { name: socket.id },
      body: 'Has joined the server.'
    });

    server.broadcast(response);
  });

  server.on('message', function(socket, message) {
    var response = JSON.stringify({
      head: { name: socket.id },
      body: message
    });

    server.broadcast(response);
  });

  server.on('close', function(socket) {
    var response = JSON.stringify({
      head: { name: socket.id },
      body: 'Has left the server.'
    });

    server.broadcast(response);
  });

  server.listen(app.httpServer);

};
