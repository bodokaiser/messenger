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
  var obj = {
    protocol: 'ws',
    hostname: location.hostname,
    pathname: pathname || '/',
  };

  if (!location.port || location.port === 80) {
    obj.port = 443;
  } else {
    obj.port = location.port;
  }

  return new WebSocket(url.format(obj));
}
