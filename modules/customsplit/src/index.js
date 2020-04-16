import Postmonger from 'postmonger';

const connection = new Postmonger.Session();
var payload = {};
var doneOnce = false;

document.addEventListener('DOMContentLoaded', onRender);

connection.on('initActivity', initialize);
connection.on('requestedTokens', onGetTokens);
connection.on('requestedEndpoints', onGetEndpoints);
connection.on('clickedNext', save);


var exampleInitializeData = {
    outcomes: [{
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
};

function onRender(e) {

    // JB will respond the first time 'ready' is called with 'initActivity'
    // All Postmonger events
    // https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
    connection.trigger('ready');
    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');

    // To Test Locally uncomment this line
    //initialize(exampleInitializeData);
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

    console.log('-------- Initialize --------');
    console.log('data', JSON.stringify(data));
    console.log('----------------------------');

    data.outcomes.forEach((item) => {
        $('#path').append(
            $('<option/>', {
                value: item.arguments.branchResult,
                text : item.metaData.label
            })
        );
    });

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

    var path = getArg(inArguments, 'path');


    if (path) {
        // If there is a message, skip to the summary step
        $('#path').val(path);
    }

    // update the next button upon load.
    updateNextButton();

    // update the next button should the inputs change.
    $('#path').change(updateNextButton);
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
        path: getMessage()
    }];

    payload['metaData'].isConfigured = true;


    console.log('----------------------------');
    console.log('saving', payload);
    console.log('----------------------------');


    connection.trigger('updateActivity', payload);
}

function getMessage() {
    return $('#path').val();
}
