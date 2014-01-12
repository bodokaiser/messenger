var lodash = require('lodash');

module.exports = function(app) {

    app.configure(function() {
        var settings = lodash.cloneDeep(require('../../etc/general'));

        lodash.merge(app.settings, settings);
    });

    app.configure('production', function() {
        var settings = lodash.cloneDeep(require('../../etc/production'));

        lodash.merge(app.settings, settings);
    });

    app.configure('development', function() {
        var settings = lodash.cloneDeep(require('../../etc/development'));

        lodash.merge(app.settings, settings);
    });

};
