var swig   = require('swig');
var domify = require('domify');

var Form = require('./form');
var List = require('./list');

module.exports = function(app) {

    app('/', function(context, next) {
        var list = new List(context.element.querySelector('ul'));
        var form = new Form(context.element.querySelector('form'));
    
        form.on('submit', function(value) {
            context.events.emit('outgoing', value);
            
            form.reset();
        });

        context.events.on('incoming', function(message) {
            list.push(message);
        });
    });

};
