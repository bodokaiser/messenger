module.exports = function(app) {

    require('./base')(app);

    require('./paths')(app);

    require('./views')(app);

};
