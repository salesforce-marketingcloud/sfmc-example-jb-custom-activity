module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `images/icon.svg`,
      category: 'customer'
    },
    type: 'REST',
    lang: {
      'en-US': {
        name: 'Example discount-code!',
        description: 'discount-code service endpoint and reply back with a message you specify in the activities settings.'
      }
    },
    arguments: {
      execute: {
        // See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/how-data-binding-works.htm
        inArguments: [],
        outArguments: [{
          // This Custom Activity Produces a Discount Code
          discountCode: 'example'
        }],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers.host}/modules/discount-code/execute`,
        // The amount of time we want Journey Builder to wait for our
        timeout: 10000,
        retryCount: 3,
        retryDelay: 0
      }
    },
    configurationArguments: {
      publish: {
        url: `https://${req.headers.host}/modules/discount-code/publish`
      },
      validate: {
        url: `https://${req.headers.host}/modules/discount-code/validate`
      },
      stop: {
        url: `https://${req.headers.host}/modules/discount-code/stop`
      }
    },
    userInterfaces: {
      configurationSupportsReadOnlyMode : true,
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true
      }
    },
    schema: {
      arguments: {
        execute: {
          inArguments: [],
          outArguments: [{
            discountCode: {
              dataType: 'Text',
              direction: 'out',
              access: 'visible'
            }
          }]
        }
      }
    }
  };
};
