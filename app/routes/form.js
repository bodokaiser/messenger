var util   = require('util');
var events = require('events');
var lodash = require('lodash');

function Form(element) {
  this.element = element;

  listenToDropEvent(this.element, this);
  listenToSubmitEvent(this.element, this);

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

function listenToDropEvent(element, view) {
  element.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();

    lodash.forEach(e.dataTransfer.files, function(file) {
      if (!file.type.match(/image.*/)) return;

      var reader = new FileReader();

      reader.addEventListener('load', function(e) {
        view.emit('drop', e.target.result);
      });
      reader.readAsDataURL(file);
    });
  });
}

function listenToSubmitEvent(element, view) {
  element.addEventListener('submit', function(e) {
    e.preventDefault();

    view.emit('submit', view.value());
  });
}
