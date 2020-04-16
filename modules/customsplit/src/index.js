// JOURNEY BUILDER CUSTOM ACTIVITY - CUSTOM SPLIT
// ````````````````````````````````````````````````````````````
// This example demonstrates ... explain ....
// We're building on concepts visited in previous examples so make sure
// you check out the "ping" module before jumping into this one

import Postmonger from 'postmonger';

const connection = new Postmonger.Session();
let activity = null;
let doneOnce = false;

document.addEventListener('DOMContentLoaded', function main() {

    // Setup a test harness so we can interact with our custom activity
    // outside of journey builder using window functions and browser devtools.
    // This isn't required by your activity, its for example purposes only
    setupExampleTestHarness();

    // setup our ui event handlers
    setupEventHandlers();

    // Journey Builder will trigger "initActivity" after it receives the "ready" event
    connection.on('initActivity', onInitActivity);

    // signal Journey Builder that we're ready to receive the activity...
    connection.trigger('ready');
});

// this function is triggered by Journey Builder after it receives the "ready" signal
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
    console.log('activity\n', JSON.stringify(activity, null, 4));
    console.log('Has In Arguments: ', hasInArguments);
    console.log('inArguments', inArguments);
    console.log('----------------------------');

    // render all of this activity's outcomes into a drop down list
    const selectOptions = activity.outcomes.map((outcome) => {
        const value = outcome.arguments.branchResult;
        const text = outcome.metaData.label;
        return `<option value="${value}">${text}</option>`;
    });

    document.getElementById('path').innerHTML = selectOptions.join('');

    const pathArgument = inArguments.find((arg) => arg.path);

    console.log('Path Argument', pathArgument);

}

function onPathSelectChange() {
    // enable or disable the done button when the select option changes
    const select = document.getElementById('path');

    if (select.selectedIndex) {
        document.getElementById('done').removeAttribute('disabled');
    } else {
        document.getElementById('done').setAttribute('disabled', '');
    }

    // let journey builder know the activity has changes
    connection.trigger('setActivityDirtyState', true);
}

function onDoneButtonClick() {
    // you can set the name that appears below the activity with the name property
    activity.name = 'My Split Activity';

    // we set must metaData.isConfigured in order to tell JB that
    // this activity is ready for activation
    activity['metaData'].isConfigured = true;

    // get the option that the user selected and save it to
    const select = document.getElementById('path');
    const option = select.options[select.selectedIndex];

    activity.arguments.execute.inArguments = [{
        path: option.value
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

function setupEventHandlers() {
    document.getElementById('done').addEventListener('click', onDoneButtonClick);
    document.getElementById('cancel').addEventListener('click', onCancelButtonClick);
    document.getElementById('path').addEventListener('change', onPathSelectChange);
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
                execute: {
                    inArguments: [],
                    outArguments: [],
                }
            },
            outcomes: [
                {
                    arguments: {
                        branchResult: 'no_action'
                    },
                    metaData: {
                        label: 'No Activity'
                    }
                },
                {
                    arguments: {
                        branchResult: 'viewed_item'
                    },
                    metaData: {
                        label: 'Viewed Item'
                    }
                },
                {
                    arguments: {
                        branchResult: 'abandoned_cart'
                    },
                    metaData: {
                        label: 'Abandoned Cart'
                    }
                },
                {
                    arguments: {
                        branchResult: 'purchased_item'
                    },
                    metaData: {
                        label: 'Purchased Item'
                    }
                }
            ]
        });
    };
}
