import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import Postmonger from 'postmonger';

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

'use strict';

var connection = new Postmonger.Session();
var payload = {};

var exampleInitializeData = {
  arguments: {
    executionMode: "{{Context.ExecutionMode}}",
    definitionId: "{{Context.DefinitionId}}",
    activityId: "{{Activity.Id}}",
    contactKey: "{{Context.ContactKey}}",
    execute: {
      inArguments: [{
        discount-code: "ding"
      }],
      outArguments: []
    },
    startActivityKey: "{{Context.StartActivityKey}}",
    definitionInstanceId: "{{Context.DefinitionInstanceId}}",
    requestObjectId: "{{Context.RequestObjectId}}"
  }
};

$(window).ready(onRender);

// All Postmonger events that the Custom Activity recieve:
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
connection.on('initActivity', initialize);
connection.on('clickedNext', save);

/**
 * Simple onReady This function will alert the
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function onRender(e) {
  connection.trigger('ready');

  // To Test Locally uncomment this line
  //initialize(exampleInitializeData);
}

function updateNextButton(force) {
  // we can update the botton to say 'done' once the
  // user has filled out all the controls properly.
  var isDone = (force || getMessage());
  console.log('Updated Button to', isDone ? 'done' : 'next')

  connection.trigger('updateButton', {
    button: 'next',
    text: isDone ? 'done' : 'next',
    enabled: Boolean(isDone)
  });
}

function initialize(data) {

  if (data) {
    payload = data;
  }

  var hasInArguments = Boolean(
    payload['arguments'] &&
    payload['arguments'].execute &&
    payload['arguments'].execute.inArguments &&
    payload['arguments'].execute.inArguments.length > 0
  );

  var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

  console.log('-------- Initialize --------');
  console.log('data', JSON.stringify(data));
  console.log('Has In Arguments: ', hasInArguments);
  console.log('inArguments', inArguments);
  console.log('----------------------------');


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

  var discount-code = getArg(inArguments, 'discount-code');

  // the value that was passed in from the API.
  console.log('discount-code Argument', discount-code);

  if (discount-code) {
    // If there is a message, skip to the summary step
    $('#discount-code').val(discount-code);
  }

  // update the next button upon load.
  updateNextButton();

  // update the next button should the inputs change.
  $('#discount-code').change(updateNextButton);
}

function save() {
  // 'payload' is initialized on 'initActivity' above.
  // Journey Builder sends an initial payload with defaults
  // set by this activity's config.json file.  Any property
  // may be overridden as desired.
  payload.name = name;

  payload['arguments'].execute.inArguments = [{
    "discount-code": getMessage()
  }];

  payload['metaData'].isConfigured = true;

  console.log('----------------------------');
  console.log('saving', payload);
  console.log('----------------------------');

  connection.trigger('updateActivity', payload);
}

function getMessage() {
  // We will only return the message if they have typed in a message or selected
  // it from the list.
  return $('#discount-code').val();
}
