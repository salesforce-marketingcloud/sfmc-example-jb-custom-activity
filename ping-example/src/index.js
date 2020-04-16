// JOURNEY BUILDER CUSTOM ACTIVITY - PING EXAMPLE
// ````````````````````````````````````````````````````````````
// This example demonstrates ... explain ....
//
// Postmonger Events Reference can be found here:
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm


// Custom activities load inside an iframe. We'll use postmonger to manage
// the Cross-Document Messaging between Journey Builder and the activity
import Postmonger from 'postmonger';


// Create a new connection for this session.
// We use this connection to talk to Journey Builder so you'll want to keep this
// reference handy if you're using React, Angular, Vue, etc.
const connection = new Postmonger.Session();


// Wait for the document to load before we doing anything
document.addEventListener('DOMContentLoaded', function main() {

    // Bind the initActivity event...
    // Journey Builder will respond with "initActivity" after it receives the "ready" signal
    connection.on('initActivity', onInitActivity);


    // ... do your initialization work before you invoke the "ready" signal...


    // We're all set! time to signal Journey Builder
    // that this activity is ready to receive the activity payload...
    connection.trigger('ready');

});

// this function is triggered by Journey Builder.
// JB will send hand us a copy of the activity in the first argument
function onInitActivity(activity) {
    const hasInArguments = Boolean(
        activity['arguments'] &&
        activity['arguments'].execute &&
        activity['arguments'].execute.inArguments &&
        activity['arguments'].execute.inArguments.length > 0
    );

    const inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    console.log('-------- Initialize --------');
    console.log('data', JSON.stringify(data));
    console.log('Has In Arguments: ', hasInArguments);
    console.log('inArguments', inArguments);
    console.log('----------------------------');


    function getArg(inArguments, arg) {
        let toReturn;
        inArguments.forEach((inArgument, index) => {
            if (!toReturn) {
                inArgument.forEach((key, val) => {
                    if (key === arg) {
                        toReturn = val;
                    }
                });
            }
        });
        return toReturn;
    }

    var ping = getArg(inArguments, 'ping');

    // the value that was passed in from the API.
    console.log('Ping Argument', ping);

    if (ping) {
        // If there is a message, skip to the summary step
        document.getElementById('#ping').innerText = ping;
    }

    // update the next button upon load.
    updateNextButton();

    // update the next button should the inputs change.
    $('#ping').change(updateNextButton);

}

var payload = {};

var exampleInitializeData = {
    arguments: {
        executionMode: "{{Context.ExecutionMode}}",
        definitionId: "{{Context.DefinitionId}}",
        activityId: "{{Activity.Id}}",
        contactKey: "{{Context.ContactKey}}",
        execute: {
            inArguments: [{
                ping: "ding"
            }],
            outArguments: []
        },
        startActivityKey: "{{Context.StartActivityKey}}",
        definitionInstanceId: "{{Context.DefinitionInstanceId}}",
        requestObjectId: "{{Context.RequestObjectId}}"
    }
};




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

    console.log('----------------------------');
    console.log('saving', payload);
    console.log('----------------------------');

    connection.trigger('updateActivity', payload);
}

function getMessage() {
    // We will only return the message if they have typed in a message or selected
    // it from the list.
    return $('#ping').val();
}
