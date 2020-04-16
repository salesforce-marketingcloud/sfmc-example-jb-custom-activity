const express = require('express');
const path = require('path');
const configJSON = require('./config-json');

const APP_ROOT = path.join(__dirname, '../..');

module.exports = function pingExampleRoutes(app) {
    const examplePath = path.join(APP_ROOT, 'split-example/dist');

    app.use('/split-example', express.static(examplePath));

    app.get('/split-example', function(req, res) {
        res.redirect('/index.html');
    });

    app.get('/split-example/config.json', function(req, res) {
        res.send(configJSON(req));
    });

};
