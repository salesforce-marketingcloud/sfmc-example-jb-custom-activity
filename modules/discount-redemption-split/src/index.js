// JOURNEY BUILDER CUSTOM ACTIVITY - CUSTOM SPLIT
// ````````````````````````````````````````````````````````````
// This example demonstrates ... explain ....
// We're building on concepts visited in previous examples so make sure
// you check out the "discount-code" module before jumdiscount-code into this one

import Postmonger from 'postmonger';
import SampleInteraction from './sampleInteraction.js';

const connection = new Postmonger.Session();
let activity = null;

document.addEventListener('DOMContentLoaded', function main() {

    // Setup a test harness so we can interact with our custom activity
    // outside of journey builder using window functions and browser devtools.
    // This isn't required by your activity, its for example purposes only
    setupExampleTestHarness();

    // setup our ui event handlers
    setupEventHandlers();

    // Journey Builder will trigger "initActivity" after it receives the "ready" event
    connection.on('initActivity', onInitActivity);
    connection.on('requestedInteractionDefaults', requestedInteractionDefaults);
    connection.on('requestedInteraction', requestedInteraction);

    // We're all set! let's signal Journey Builder
    // that we're ready to receive the activity payload...

    // Tell the parent iFrame that we are ready.
    connection.trigger('ready');

    // Tell the parent iFrame we want the Interaction Defaults
    connection.trigger('requestInteractionDefaults');

    // Tell the parent iFrame we want the Interaction
    connection.trigger('requestInteraction');
});

function requestedInteractionDefaults(payload) {
    console.log('-------- requestedInteractionDefaults --------');
    console.log('payload\n', JSON.stringify(payload, null, 4));
    console.log('requestInteraction', payload);
    console.log('---------------------------------------------');
}

function requestedInteraction(payload) {
    console.log('-------- requestedInteraction --------');
    console.log('payload\n', JSON.stringify(payload, null, 4));
    console.log('requestInteraction', payload);
    console.log('--------------------------------------');
}

// this function is triggered by Journey Builder after it receives the "ready" signal
function onInitActivity(payload) {
    // set the activity object from this payload. We'll refer to this object as we
    // modify it before saving.
    activity = payload;

    console.log('-------- triggered:onInitActivity({obj}) --------');
    console.log('activity:\n ', JSON.stringify(activity, null, 4));
    console.log('-------------------------------------------------');

    // render all of this activity's outcomes into a drop down list
    const selectOptions = activity.outcomes.map((outcome) => {
        const value = outcome.arguments.branchResult;
        const text = outcome.metaData.label;
        return `<option value="${value}">${text}</option>`;
    });

    // There is no need to have the disabled attribute on the close button as there
    // are no options for the user to select.
    document.getElementById('done').removeAttribute('disabled');
}

function onDoneButtonClick() {
    // we set must metaData.isConfigured in order to tell JB that
    // this activity is ready for activation
    activity['metaData'].isConfigured = true;

    // you can set the name that appears below the activity with the name property
    activity.name = 'Code Engagement';

    // get the option that the user selected and save it to
    console.log('------------ triggering:updateActivity({obj}) ----------------');
    console.log('Sending message back to updateActivity');
    console.log('saving\n', JSON.stringify(activity, null, 4));
    console.log('--------------------------------------------------------------');

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
        jbSession.trigger('initActivity', SampleInteraction.onInitActivity);

        // Simulated the completion of "requestedInteractionDefaults"
        jbSession.trigger('requestedInteractionDefaults', SampleInteraction.requestedInteractionDefaults);

        // Simulated the completion of "requestedInteraction"
        jbSession.trigger('requestedInteraction', SampleInteraction.requestedInteraction);
    };
}
