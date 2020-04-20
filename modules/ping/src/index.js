// JOURNEY BUILDER CUSTOM ACTIVITY - PING ACTIVITY
// ````````````````````````````````````````````````````````````
// This example demonstrates ....
//
// Postmonger Events Reference can be found here:
// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm


// Custom activities load inside an iframe. We'll use postmonger to manage
// the Cross-Document Messaging between Journey Builder and the activity
import Postmonger from 'postmonger';


// Create a new connection for this session.
// We use this connection to talk to Journey Builder. You'll want to keep this
// reference handy and pass it into your UI framework if you're using React, Angular, Vue, etc.
const connection = new Postmonger.Session();


// we'll store the activity on this variable when we receive it
let activity = null;


// Wait for the document to load before we doing anything
document.addEventListener('DOMContentLoaded', function main() {

    // Setup a test harness so we can interact with our custom activity
    // outside of journey builder using window functions & browser devtools.
    // This isn't required by your activity, its for example purposes only
    setupExampleTestHarness();

    // setup our ui event handlers
    setupEventHandlers();

    // Bind the initActivity event...
    // Journey Builder will respond with "initActivity" after it receives the "ready" signal
    connection.on('initActivity', onInitActivity);


    // ... do your initialization work before you invoke the "ready" signal...


    // We're all set! let's signal Journey Builder
    // that we're ready to receive the activity payload...
    connection.trigger('ready');
});


// this function is triggered by Journey Builder via Postmonger.
// Journey Builder will send us a copy of the activity here
function onInitActivity(payload) {
    activity = payload;

    const hasInArguments = Boolean(
        activity.arguments &&
        activity.arguments.execute &&
        activity.arguments.execute.inArguments &&
        activity.arguments.execute.inArguments.length > 0
    );

    const inArguments = hasInArguments ? activity.arguments.execute.inArguments : [];

    console.log('-------- Initialize --------');
    console.log('activity:\n ', JSON.stringify(activity, null, 4));
    console.log('Has In Arguments: ', hasInArguments);
    console.log('inArguments', inArguments);
    console.log('----------------------------');

    // check if this activity has an incoming argument.
    // this would be set on the server side when the activity executes
    // (take a look at execute() in ./ping/app.js to see where that happens)
    const pingArgument = inArguments.find((arg) => arg.ping);

    console.log('Ping Argument', pingArgument);

    // if a ping back argument was set, show the message in the view.
    if (pingArgument) {
        selectPingOption(pingArgument.ping);
    }

    // if the ping back argument doesn't exist the user can pick
    // a ping message from the drop down list. the ping back arg
    // will be set once the journey executes the activity
}

function onDoneButtonClick() {
    // you can set the name that appears below the activity with the name property
    activity.name = 'My Ping Activity';

    // we set must metaData.isConfigured in order to tell JB that
    // this activity is ready for activation
    activity.metaData.isConfigured = true;

    // get the option that the user selected and save it to
    const select = document.getElementById('ping');
    const option = select.options[select.selectedIndex];

    activity.arguments.execute.inArguments = [{
        ping: option.value,
    }];

    console.log('----------------------------');
    console.log('saving', activity);
    console.log('----------------------------');

    connection.trigger('updateActivity', activity);
}

function onCancelButtonClick() {
    // tell Journey Builder that this activity has no changes.
    // we wont be prompted to save changes when the inspector closes
    connection.trigger('setActivityDirtyState', false);

    // now request that Journey Builder closes the inspector/drawer
    connection.trigger('requestInspectorClose');
}

function onPingSelectChange() {
    // enable or disable the done button when the select option changes
    const select = document.getElementById('ping');

    if (select.selectedIndex) {
        document.getElementById('done').removeAttribute('disabled');
    } else {
        document.getElementById('done').setAttribute('disabled', '');
    }

    // let journey builder know the activity has changes
    connection.trigger('setActivityDirtyState', true);
}

function selectPingOption(value) {
    const select = document.getElementById('ping');
    const selectOption = select.querySelector(`[value=${value}]`);
    if (selectOption) {
        selectOption.selected = true;
        onPingSelectChange();
    }
}

function setupEventHandlers() {
    // Listen to events on the form
    document.getElementById('done').addEventListener('click', onDoneButtonClick);
    document.getElementById('cancel').addEventListener('click', onCancelButtonClick);
    document.getElementById('ping').addEventListener('change', onPingSelectChange);
}

// this function is for example purposes only. it sets ups a Postmonger
// session that emulates how Journey Builder works. You can call jb.ready()
// from the console to kick off the initActivity event with a mock activity object
function setupExampleTestHarness() {
    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!isLocalhost) {
        // don't load the test harness functions when running in Journey Builder
        return;
    }

    const jbSession = new Postmonger.Session();
    const jb = {};
    window.jb = jb;

    jbSession.on('setActivityDirtyState', function(value) {
        console.log('[echo] setActivityDirtyState -> ', value);
    });

    jbSession.on('requestInspectorClose', function() {
        console.log('[echo] requestInspectorClose');
    });

    jbSession.on('updateActivity', function(activity) {
        console.log('[echo] updateActivity -> ', JSON.stringify(activity, null, 4));
    });

    jbSession.on('ready', function() {
        console.log('[echo] ready');
        console.log('\tuse jb.ready() from the console to initialize your activity')
    });

    // fire the ready signal with an example activity
    jb.ready = function() {
        jbSession.trigger('initActivity', {
            name: '',
            key: 'EXAMPLE-1',
            metaData: {},
            configurationArguments: {},
            arguments: {
                executionMode: "{{Context.ExecutionMode}}",
                definitionId: "{{Context.DefinitionId}}",
                activityId: "{{Activity.Id}}",
                contactKey: "{{Context.ContactKey}}",
                execute: {
                    inArguments: [
                        {
                            ping: "ding"
                        }
                    ],
                    outArguments: []
                },
                startActivityKey: "{{Context.StartActivityKey}}",
                definitionInstanceId: "{{Context.DefinitionInstanceId}}",
                requestObjectId: "{{Context.RequestObjectId}}"
            }
        });
    };
}
