var Form = require('./form');
var List = require('./list');

module.exports = function(app) {

  app('/', function(context, next) {
    var list = new List(context.element.querySelector('ul'));
    var form = new Form(context.element.querySelector('form'));

    form.on('drop', function(value) {
      context.images.send(value);
    });
    form.on('submit', function(value) {
      context.messages.send(value);

      form.reset();
    });

    context.events.on('image', function(image) {
      list.pushImage(image);
    });
    context.events.on('message', function(message) {
      list.pushMessage(message);
    });
  });

};
