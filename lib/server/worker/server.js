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
    socket.on('incoming', function(incoming) {
      if (!socket.listeners('incoming').length) return;
      if (incoming.header.length > 0x7d) return;

      var message = '';
      incoming.on('readable', function() {
        message += incoming.read().toString();
      });
      incoming.on('end', function() {
        socket.emit('message', message);
      });
    });
    socket.on('close', function() {
      var index = server.connections.indexOf(socket);
      server.connections.splice(index, 1);
    });

    server.connections.push(socket);
  });
}
