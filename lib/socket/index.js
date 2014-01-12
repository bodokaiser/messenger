var websocketx = require('websocket-x');

module.exports = function(app) {

    var connected = 0;

    websocketx.createServer(function(wsocket, wserver) {
 
        wsocket.id = connected++;

        require('./open')(wsocket, wserver);

        require('./close')(wsocket, wserver);

        require('./message')(wsocket, wserver);

    }).listen(app.server);

};
