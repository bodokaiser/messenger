var util = require('util');

module.exports = function(wsocket, wserver) {

  wsocket.on('message', function(incoming, outgoing) {
    var list = [];

    incoming.on('readable', function() {
      list.push(incoming.read());
    });
    incoming.on('end', function() {
      var message = JSON.stringify({
        head: {
          name: wsocket.id
        },
        body: Buffer.concat(list).toString()
      });

      wserver.broadcast(message);
    });
  });

};
