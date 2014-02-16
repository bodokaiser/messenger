var websocketx = require('websocket-x');

module.exports = function(app) {

  var connected = 0;

  var server = websocketx.createServer(function(wsocket, wserver) {

    wsocket.id = connected++;

    require('./open')(wsocket, wserver);

    require('./close')(wsocket, wserver);

    require('./message')(wsocket, wserver);

    console.log('connected', connected);

  });

  server.on('error', function(e) {
    console.log('error', e);
  });

  server.listen(app.server);

};
