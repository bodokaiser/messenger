var swig   = require('swig');
var domify = require('domify');

var template = '';

template += '<li class="list-group-item">';
template += '<h4 class="list-group-item-heading">Agent #{{ head.name }}</h4>';
template += '<p class="list-group-item-text">{{ body }}</p>';
template += '</li>';

module.exports = function(app) {

    app('/', function(context, next) {
        var message = context.element.querySelector('#message');
        var messages = context.element.querySelector('#messages'); 

        bindToSubmitEvent(context, message);
        bindToMessageEvent(context, messages);
    });

};

function bindToSubmitEvent(context, element) {
    var input = element.querySelector('input');

    element.addEventListener('submit', function(e) {
        e.preventDefault();

        context.events.emit('outgoing', input.value);

        input.value = '';
    });
}

function bindToMessageEvent(context, element) {
    context.events.on('incoming', function(message) {
        var li = domify(swig.render(template, {
            locals: message 
        }));
        
        messages.appendChild(li);
    });
}
