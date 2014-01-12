var express = require('express');

module.exports = function(app) {

    var options = app.settings.security;

    app.use(express.basicAuth(function(username, password, next) {
        var account = options.accounts.filter(function(account) {
            return account.username === username && 
                account.password === password;
        }).shift();

        if (account) {
            next(null, account);
        } else {
            next(new Error('Invalid credentials.'));
        }
    }));

};
