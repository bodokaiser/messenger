var page = require('page');

var app = page;

require('./query')(app);

require('./event')(app);

require('./socket')(app);

require('./router')(app);

app.start();
