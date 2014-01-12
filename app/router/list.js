var template = '<ul id="messages" class="list-group"></ul>';

var Item = require('./item');

function List(element) {
    this.element = element || domify(template);
}

List.prototype.push = function(message) {
    this.element.appendChild(new Item(message).element);

    return this;
};

module.exports = List;
