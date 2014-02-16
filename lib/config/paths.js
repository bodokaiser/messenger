var path   = require('path');
var lodash = require('lodash');

module.exports = function(app) {

  app.configure(function() {
    lodash.forIn(app.settings, resolve);
  });

};

function resolve(value, key, object) {
  if (lodash.isArray(value)) {
    return lodash.forEach(value, resolve);
  }
  if (lodash.isPlainObject(value)) {
    return lodash.forIn(value, resolve);
  }
  if (lodash.isString(value) && !value.indexOf('/')) {
    object[key] = path.join(process.cwd(), value);
  }
}
