var swig = require('swig');

module.exports = function(app) {

    app.configure(function() {
        var options = app.settings.engine.views;

        app.set('view engine', 'html');
        app.set('view cache', false);
        app.set('views', options.path);
        app.engine('html', swig.renderFile);

        swig.setDefaults(options);
    });

};
