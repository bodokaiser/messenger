var url = require('url');

module.exports = function(app) {

  var images = createWebSocket('/images');
  var messages = createWebSocket('/messages');

  app('*', function(context, next) {
    context.images = images;
    context.messages = messages;

    images.addEventListener('message', function(e) {
      context.events.emit('image', e.data);
    });
    messages.addEventListener('message', function(e) {
      context.events.emit('message', JSON.parse(e.data));
    });

    next();
  });

};

function createWebSocket(pathname) {
  var path = url.format({
    protocol: 'ws',
    hostname: location.hostname,
    pathname: pathname,
    port: location.port
  });

  return new WebSocket(path);
}
