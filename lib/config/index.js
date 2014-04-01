var path    = require('path');
var lodash  = require('lodash');
var express = require('express');

module.exports = function(app) {

  app.use(express.logger());
  app.use(express.compress());

  app.configure(function() {
    lodash.merge(app.settings, require('../../etc/general'));
  });

  app.configure('production', function() {
    lodash.merge(app.settings, require('../../etc/production'));
  });

  app.configure('development', function() {
    lodash.merge(app.settings, require('../../etc/development'));
  });

  lodash.forIn(app.settings, resolve);

};

function resolve(value, index, source) {
  if (lodash.isString(value) && !value.indexOf('/')) {
    source[index] = path.join(__dirname + '/../../', value);
  }
  if (lodash.isArray(value)) {
    lodash.forEach(value, resolve);
  }
  if (lodash.isPlainObject(value)) {
    lodash.forIn(value, resolve);
  }
}
