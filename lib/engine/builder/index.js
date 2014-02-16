var fs         = require('fs');
var path       = require('path');
var browserify = require('browserify');

module.exports = function(app) {

  var options = app.settings.engine.builder;

  app.configure('production', function() {
    var writer = createWriter(options);
    var builder = createBuilder(options);

    builder.bundle(options).pipe(writer);
  });

  app.configure('development', function() {
    app.get('/javascripts/*.js', function(req, res, next) {
      var writer = createWriter(options);
      var builder = createBuilder(options);

      builder.bundle(options).on('error', next)
      .pipe(writer.on('finish', next));
    });
  });

};

function createWriter(options) {
  return fs.createWriteStream(options.output);
}

function createBuilder(options) {
  return browserify(options);
}
