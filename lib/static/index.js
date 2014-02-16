var st   = require('st');
var path = require('path');

module.exports = function(app) {

  var options = app.settings.static;

  app.use(st(options));

};
