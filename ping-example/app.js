const express = require('express');
const configJSON = require('./server/config-json');

// setup the ping example app
module.exports = function pingExample(app, options) {
    const {rootDirectory} = options;
    const exampleDirectory = `${rootDirectory}/ping-example`;

    // setup static resources
    app.use('/ping-example/dist', express.static(`${exampleDirectory}/dist`));
    app.use('/ping-example/images', express.static(`${exampleDirectory}/images`));

    // setup the index redirect
    app.get('/ping-example/', function(req, res) {
        return res.redirect('/ping-example/index.html');
    });

    // setup index.html route
    app.get('/ping-example/index.html', function(req, res) {
        // you can use your favorite templating library to generate your html file.
        // this example keeps things simple and just returns a static file
        return res.sendFile(`${exampleDirectory}/server/index.html`);
    });

    // setup config.json route
    app.get('/ping-example/config.json', function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    // ```````````````````````````````````````````````````````

    app.post('/save', function(req, res) {
        console.log('debug: /ping-example/save');
        return res.status(200).json({});
    });

    app.post('/publish', function(req, res) {
        console.log('debug: /ping-example/save');
        return res.status(200).json({});
    });

    app.post('/validate', function(req, res) {
        console.log('debug: /ping-example/validate');
        return res.status(200).json({});
    });

    app.post('/stop', function(req, res) {
        console.log('debug: /ping-example/stop');
        return res.status(200).json({});
    });

    app.post('/execute', function(req, res) {
        console.log('debug: /ping-example/execute');

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
