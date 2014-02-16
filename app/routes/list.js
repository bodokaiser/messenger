var template = require('../views/list');

var ImageItem = require('./image');
var MessageItem = require('./message');

function List(element) {
  this.element = element || domify(template());
}

List.prototype.pushImage = function(image) {
  this.element.appendChild(new ImageItem(image).element);

  return this;
};

List.prototype.pushMessage = function(message) {
  this.element.appendChild(new MessageItem(message).element);

  return this;
};

module.exports = List;
