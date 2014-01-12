var http = require('http');

module.exports = function(app) {
    app.server = http.createServer(app);
    app.server.listen(app.settings.port);
};
