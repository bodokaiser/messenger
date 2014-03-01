var walve = require('walve');

var Server = require('./server');

module.exports = function(app) {

  var server = new Server({
    url: '/images'
  });

  server.on('connect', function(socket) {
    socket.on('incoming', function(incoming) {
      incoming.on('error', function() {
        socket.source.close();
      });

      each(server, function(socket) {
        var outgoing = new walve.Outgoing({
          header: {
            final: false,
            opcode: 0x01
          }
        });

        pipe(outgoing, socket).end('');
      });

      incoming.on('readable', function() {
        var chunk = incoming.read();

        each(server, function(socket) {
          var outgoing = new walve.Outgoing({
            header: {
              final: false,
              opcode: 0x00,
              length: chunk.length
            }
          });

          pipe(outgoing, socket).end(chunk);
        });
      });

      incoming.on('end', function() {
        each(server, function(socket) {
          var outgoing = new walve.Outgoing({
            header: {
              final: true,
              opcode: 0x00
            }
          });

          pipe(outgoing, socket).end('');
        });
      });
    });
  });

  server.listen(app.httpServer);

};

function each(server, callback) {
  server.connections.forEach(callback);
}

function pipe(outgoing, socket) {
  outgoing.pipe(socket, { end: false });

  return outgoing;
}
