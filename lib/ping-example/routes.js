const express = require('express');
const path = require('path');
const configJSON = require('./config-json');

const APP_ROOT = path.join(__dirname, '../..');

module.exports = function pingExampleRoutes(app) {
    const examplePath = path.join(APP_ROOT, 'ping-example/dist');

    app.use('/ping-example', express.static(examplePath));

    app.get('/ping-example', function(req, res) {
        res.redirect('/index.html');
    });

    app.get('/ping-example/config.json', function(req, res) {
        res.send(configJSON(req));
    });

};
