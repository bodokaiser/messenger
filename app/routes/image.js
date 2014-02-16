var domify   = require('domify');

var template = require('../views/image');

function Item(model) {
  this.element = domify(template({
    image: model
  }));
}

module.exports = Item;
