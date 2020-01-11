define([
  'postmonger'
], function(
  Postmonger
) {
  'use strict';

  var connection = new Postmonger.Session();
  var payload = {};
  var doneOnce = false;

  $(window).ready(onRender);

  connection.on('initActivity', initialize);
  connection.on('requestedTokens', onGetTokens);
  connection.on('requestedEndpoints', onGetEndpoints);

  connection.on('clickedNext', save);

  function onRender(e) {

    // JB will respond the first time 'ready' is called with 'initActivity'
    // All Postmonger events
    // https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
    connection.trigger('ready');
    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');

    // To Test Locally uncomment this line
    //initialize();
  }

  function updateNextButton(force) {
    // we can enable the button for 'done' by calling the
    // connection to alert it to update the button.
    connection.trigger('updateButton', {
      button: 'next',
      text: (force || getMessage()) ? 'done' : 'next',
      enabled: Boolean((force || getMessage()))
    });
  }

  function initialize(data) {

    if (data) {
      payload = data;
    }


    if (!doneOnce) {
      // add another outcome.
      payload.outcomes.push({
        "arguments": {
          "branchResult": "additional_activity_thing",
          "some argument": "passed from config.json for hold_item"
        },
        "metaData": {
          "label": "additional_activity_thing"
        }
      });
    }

    console.log('-------- Initialize --------');
    console.log('data', JSON.stringify(data));
    console.log('----------------------------');

    var hasInArguments = Boolean(
      payload['arguments'] &&
      payload['arguments'].execute &&
      payload['arguments'].execute.inArguments &&
      payload['arguments'].execute.inArguments.length > 0
    );

    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    function getArg(inArguments, arg) {
      var toReturn;
      $.each(inArguments, function(index, inArgument) {
        if (!toReturn) {
          $.each(inArgument, function(key, val) {
            if (key === arg) {
              toReturn = val;
            }
          });
        }
      });
      return toReturn;
    }

    var ping = getArg(inArguments, 'ping');

    if (ping && ping.value) {
      // If there is a message, skip to the summary step
      $('#ping').combobox('selectByValue', ping.value);
    } else if (ping && ping.text) {
      $('#ping :text').val(ping.text);
    }

    // update the next button upon load.
    updateNextButton();

    // update the next button should the inputs change.
    $('#ping').on('changed.fu.combobox', updateNextButton);
    $('#ping :text').on('keypress', function() {
      updateNextButton($('#ping :text').val() !== "");
    });
  }

  // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
  function onGetTokens(tokens) {
    console.log('------ tokens -------');
    console.log(JSON.stringify(tokens));
    console.log('---------------------');
  }

  // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
  function onGetEndpoints(endpoints) {
    console.log('------ endpoints -------');
    console.log(JSON.stringify(endpoints));
    console.log('------------------------');
  }

  function save() {
    // 'payload' is initialized on 'initActivity' above.
    // Journey Builder sends an initial payload with defaults
    // set by this activity's config.json file.  Any property
    // may be overridden as desired.
    payload.name = name;

    payload['arguments'].execute.inArguments = [{
      "ping": getMessage()
    }];

    payload['metaData'].isConfigured = true;

    connection.trigger('updateActivity', payload);
  }

  function getMessage() {
    // We will only return the message if they have typed in a message or selected
    // it from the list.
    var selection = $('#ping').combobox('selectedItem');
    if (selection.text !== "") {
      return selection;
    }
  }

});
