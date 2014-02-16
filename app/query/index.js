module.exports = function(app) {

  var element = document.querySelector('section');

  app('*', function(context, next) {
    context.element = element;

    next();
  });

};
