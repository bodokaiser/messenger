var events = require('events');

module.exports = function(app) {

    app('*', function(context, next) {
        context.events = new events.EventEmitter();

        next();
    });

};
