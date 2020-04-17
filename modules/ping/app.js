// JOURNEY BUILDER CUSTOM ACTIVITY - PING ACTIVITY
// ````````````````````````````````````````````````````````````
// SERVER SIDE IMPLEMENTATION
//
// This example demonstrates
// * Configuration Lifecycle Events
//    - save
//    - publish
//    - validate
// * Execution Lifecycle Events
//    - execute
//    - stop

const express = require('express');
const configJSON = require('./server/config-json');

// setup the ping example app
module.exports = function pingExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/ping`;

    // setup static resources
    app.use('/modules/ping/dist', express.static(`${moduleDirectory}/dist`));
    app.use('/modules/ping/images', express.static(`${moduleDirectory}/images`));

    // setup the index redirect
    app.get('/modules/ping/', function(req, res) {
        return res.redirect('/modules/ping/index.html');
    });

    // setup index.html route
    app.get('/modules/ping/index.html', function(req, res) {
        // you can use your favorite templating library to generate your html file.
        // this example keeps things simple and just returns a static file
        return res.sendFile(`${moduleDirectory}/server/index.html`);
    });

    // setup config.json route
    app.get('/modules/ping/config.json', function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    // ```````````````````````````````````````````````````````

    /**
     * Called when a journey is saving the activity.
     * @return {[type]}     [description]
     */
    app.post('/modules/ping/save', function(req, res) {
        console.log('debug: /modules/ping/save');
        return res.status(200).json({});
    });

    /**
     * Called when a Journey has been published.
     * This is when a journey is being activiated and eligible for contacts
     * to be processed.
     * @return {[type]}     [description]
     */
    app.post('/modules/ping/publish', function(req, res) {
        console.log('debug: /modules/ping/publish');
        return res.status(200).json({});
    });

    /**
     * Called when Journey Builder wants you to validate the configuration
     * to ensure the configuration is valid.
     * @return {[type]}
     * 200 - Return a 200 iff the configuraiton is valid.
     * ??? - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/ping/validate', function(req, res) {
        console.log('debug: /modules/ping/validate');
        return res.status(200).json({});
    });

    /**
     * Called when a Journey is stopped.
     * @return {[type]}
     */
    app.post('/modules/ping/stop', function(req, res) {
        console.log('debug: /modules/ping/stop');
        return res.status(200).json({});
    });

    /**
     * Called when a contact is flowing through the Journey.
     * @return {[type]}
     * 200 - Processed OK
     * 3xx - Contact is ejected from the Journey.
     * 4xx - Contact is ejected from the Journey.
     * 5xx - Contact is ejected from the Journey.
     */
    app.post('/modules/ping/execute', function(req, res) {
        console.log('debug: /modules/ping/execute');

        const request = req.body;

        console.log(" req.body", JSON.stringify(req.body));

        // Find the in argument
        function getInArgument(k) {
            if (request && request.inArguments) {
                for (let i = 0; i < request.inArguments.length; i++) {
                    let e = request.inArguments[i];
                    if (k in e) {
                        return e[k];
                    }
                }
            }
        }

        // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
        const pingInArgument = getInArgument('ping') || 'nothing';
        const responseObject = {
            pong: pingInArgument
        };

        console.log('Response Object', JSON.stringify(responseObject));

        return res.status(200).json(responseObject);
    });

};
