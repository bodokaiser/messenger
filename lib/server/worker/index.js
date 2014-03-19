module.exports = function(app) {

  require('./http')(app);

  require('./ws')(app);

};
