var st   = require('st');
var path = require('path');

module.exports = function(app) {

  app.use(st(app.settings.static));

};
