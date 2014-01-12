var url = require('url');

module.exports = function(app) {

    var ws = createWebSocket();

    app('*', function(context, next) {
        ws.addEventListener('open', function(e) {
            context.events.emit('open');
        });
        ws.addEventListener('close', function(e) {
            context.events.emit('close');
        });
        ws.addEventListener('message', function(e) {
            context.events.emit('incoming', JSON.parse(e.data));
        });
        
        context.events.on('outgoing', function(message) {
            ws.send(message);
        });

        next();
    });

};

function createWebSocket() {
    var path = url.format({
        protocol: 'wss',
        host: location.host
    });

    return new WebSocket(path);
}
