var domify   = require('domify');

var template = require('../views/message');

function Item(model) {
  this.element = domify(template(model));
}

module.exports = Item;
