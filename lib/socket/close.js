var util = require('util');

module.exports = function(wsocket, wserver) {

    var message = JSON.stringify({
        head: {
            name: wsocket.id
        },
        body: 'Has left the server.'
    });

    wsocket.on('close', function() {
        wserver.broadcast(message);
    });
    wsocket.on('end', function() {
        wserver.broadcast(message);
    });

};
