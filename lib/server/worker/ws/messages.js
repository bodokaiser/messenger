var Server = require('./server');

module.exports = function(app) {

  var server = new Server({
    url: '/messages'
  });

  server.on('connect', function(socket) {
    socket.id = server.connections.length;

    socket.on('message', function(message) {
      var broadcast = createMessage({
        name: socket.id
      }, message);

      server.broadcast(broadcast);
    });
    socket.on('close', function() {
      var broadcast = createMessage({
        name: socket.id
      }, 'Has left the server.');

      server.broadcast(broadcast);
    });

    var broadcast = createMessage({
      name: socket.id
    }, 'Has joined thed server.');

    server.broadcast(broadcast);
  });

  server.listen(app.httpServer);

};

function createMessage(head, body) {
  return JSON.stringify({
    head: head,
    body: body
  });
}
