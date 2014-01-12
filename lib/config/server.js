var fs = require('fs');

module.exports = function(app) {
    
    app.configure(function() {
        var options = app.settings.server;

        options.key = fs.readFileSync(options.key).toString();
        options.cert = fs.readFileSync(options.cert).toString();
    });

};
