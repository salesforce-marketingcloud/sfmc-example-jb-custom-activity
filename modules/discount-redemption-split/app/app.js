const express = require('express');
const configJSON = require('../config/config-json');

// setup the split example app
module.exports = function splitExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/discount-redemption-split`;

    // setup static resources
    app.use('/modules/discount-redemption-split/dist', express.static(`${moduleDirectory}/dist`));
    app.use('/modules/discount-redemption-split/images', express.static(`${moduleDirectory}/images`));

    // setup the index redirect
    app.get('/modules/discount-redemption-split/', function(req, res) {
        return res.redirect('/modules/discount-redemption-split/index.html');
    });

    // setup index.html route
    app.get('/modules/discount-redemption-split/index.html', function(req, res) {
        // you can use your favorite templating library to generate your html file.
        // this example keeps things simple and just returns a static file
        return res.sendFile(`${moduleDirectory}/html/index.html`);
    });

    // setup config.json route
    app.get('/modules/discount-redemption-split/config.json', function(req, res) {
        // Journey Builder looks for config.json when the canvas loads.
        // We'll dynamically generate the config object with a function
        return res.status(200).json(configJSON(req));
    });

    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // CONFIGURATION
    // ```````````````````````````````````````````````````````
    // Reference:
    // https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/interaction-operating-states.htm

    /**
     * Called when a journey is saving the activity.
     * @return {[type]}     [description]
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/discount-redemption-split/save', function(req, res) {
        console.log('debug: /modules/discount-redemption-split/save');
        return res.status(200).json({});
    });

    /**
     * Called when a Journey has been published.
     * This is when a journey is being activiated and eligible for contacts
     * to be processed.
     * @return {[type]}     [description]
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/discount-redemption-split/publish', function(req, res) {
        console.log('debug: /modules/discount-redemption-split/publish');
        return res.status(200).json({});
    });

    /**
     * Called when Journey Builder wants you to validate the configuration
     * to ensure the configuration is valid.
     * @return {[type]}
     * 200 - Return a 200 iff the configuraiton is valid.
     * 30x - Return if the configuration is invalid (this will block the publish phase)
     * 40x - Return if the configuration is invalid (this will block the publish phase)
     * 50x - Return if the configuration is invalid (this will block the publish phase)
     */
    app.post('/modules/discount-redemption-split/validate', function(req, res) {
        console.log('debug: /modules/discount-redemption-split/validate');
        return res.status(200).json({});
    });


    // ```````````````````````````````````````````````````````
    // BEGIN JOURNEY BUILDER LIFECYCLE EVENTS
    //
    // EXECUTING JOURNEY
    // ```````````````````````````````````````````````````````

    /**
     * Called when a Journey is stopped.
     * @return {[type]}
     */
    app.post('/modules/discount-redemption-split/stop', function(req, res) {
        console.log('debug: /modules/discount-redemption-split/stop');
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
    app.post('/modules/discount-redemption-split/execute', function(req, res) {
        console.log('debug: /modules/discount-redemption-split/execute');

        var request = req.body;

        console.log('req', req === undefined ? 'empty' : 'has');
        console.log('req.body', req.body);

        // Find the in argument
        var getInArgument = (k) => {
          if (req.body && req.body.inArguments) {
            for (let i = 0; i < req.body.inArguments.length; i++) {
              let e = req.body.inArguments[i];
              if (k in e) {
                return e[k];
              }
            }
          }
          console.log("Unable To Find In Argument: ", k);
          return;
        }

        // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
        let discountCode = getInArgument('discountCode') || 'nothing';

      console.log('discount code:', discountCode);

      if(discountCode && discountCode.length > 0) {
          switch (discountCode[0]) {
              case 'A':
                  console.log('')
                  return res.status(200).json({branchResult: 'no_activity'});
              case 'B':
                  return res.status(200).json({branchResult: 'viewed_item'});
              case 'C':
                  return res.status(200).json({branchResult: 'abandoned_cart'});
              case 'D':
                  return res.status(200).json({branchResult: 'purchased_item'});
              case 'E':
              default:
                  return res.status(200).json({branchResult: 'invalid_code'});
          }
      } else {
          // Fail the contact, we don't know this discount code.
          return res.status(500).json({branchResult: 'invalid_code'});
      }
    });

};
