var https = require('https');

module.exports = function(app) {
    
    var options = app.settings.server;

    app.server = https.createServer(options, app);
    app.server.listen(options.port);

};
