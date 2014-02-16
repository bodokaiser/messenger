var util  = require('util');
var walve = require('walve');

function Server(options) {
  this.connections = [];

  listenToConnectEvent(this);

  walve.Server.call(this, options);
}

util.inherits(Server, walve.Server);

Server.prototype.broadcast = function(chunk) {
  this.connections.forEach(function(socket) {
    var outgoing = new walve.Outgoing({
      header: { length: chunk.length }
    });

    outgoing.pipe(socket, { end: false });
    outgoing.end(chunk);
  });

  return this;
};

module.exports = Server;

function listenToConnectEvent(server) {
  server.on('connect', function(socket) {
    socket.on('message', function(incoming) {
      // this allows compatibility with images as we
      // do not want to buffer them up
      if (!server.listeners('message').length) return;

      incoming.on('header', function(header) {
        if (header.opcode !== 0x01) return;
        if (header.length > 0x7d) return;

        var message = '';

        incoming.on('readable', function() {
          message += incoming.read().toString();
        });
        incoming.on('end', function() {
          server.emit('message', socket, message);
        });
      });
    });
    socket.on('end', function() {
      var index = server.connections.indexOf(socket);

      server.connections.splice(index, 1);
      server.emit('close', socket);
    });

    server.connections.push(socket);
  });
}
