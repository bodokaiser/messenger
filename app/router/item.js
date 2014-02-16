var swig   = require('swig');
var domify = require('domify');

var template = '';
template += '<li class="list-group-item">';
template += '<h4 class="list-group-item-heading">Agent #{{ message.head.name }}</h4>';
template += '<p class="list-group-item-text">{{ message.body }}</p>';
template += '</li>';

function Item(model) {
  this.element = domify(swig.render(template, {
    locals: { message: model }
  }));
}

module.exports = Item;
