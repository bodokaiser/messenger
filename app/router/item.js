var domify   = require('domify');

var template = require('../views/item');

function Item(model) {
  this.element = domify(template(model));
}

module.exports = Item;
