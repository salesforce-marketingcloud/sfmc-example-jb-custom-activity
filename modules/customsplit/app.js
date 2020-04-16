const express = require('express');
const configJSON = require('./server/config-json');

// setup the split example app
module.exports = function splitExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/customsplit`;

    // setup static resources
    app.use('/modules/customsplit/dist', express.static(`${moduleDirectory}/dist`));
    app.use('/modules/customsplit/images', express.static(`${moduleDirectory}/images`));

    // setup the index redirect
    app.get('/modules/customsplit/', function(req, res) {
        return res.redirect('/modules/customsplit/index.html');
    });

    // setup index.html route
    app.get('/modules/customsplit/index.html', function(req, res) {
        // you can use your favorite templating library to generate your html file.
        // this example keeps things simple and just returns a static file
        return res.sendFile(`${moduleDirectory}/server/index.html`);
    });

    // setup config.json route
    app.get('/modules/customsplit/config.json', function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    // ```````````````````````````````````````````````````````

};
