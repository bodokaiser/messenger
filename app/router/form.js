var util   = require('util');
var events = require('events');

function Form(element) {
  this.element = element;

  bindToSubmitEvent(this.element, this);

  events.EventEmitter.call(this);
}

util.inherits(Form, events.EventEmitter);

Form.prototype.value = function() {
  var element = this.element.querySelector('input');

  return element.value;
};

Form.prototype.reset = function() {
  var element = this.element.querySelector('input');

  element.value = '';

  return this;
};

module.exports = Form;

function bindToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.value());
  });
}
