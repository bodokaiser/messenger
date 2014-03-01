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
	var object = {
		protocol: 'ws',
    pathname: pathname || '/',
    hostname: location.hostname,
    port: location.port || 443
	};

	return new WebSocket(url.format(object));
}
