var util = require('util');

module.exports = function(wsocket, wserver) {

  var message = JSON.stringify({
    head: {
      name: wsocket.id
    },
    body: 'Has joined the server.'
  });

  wserver.broadcast(message);

};
