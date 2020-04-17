module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `images/icon.png`,
      category: 'customer'
    },
    type: 'REST',
    lang: {
      'en-US': {
        name: 'Example Ping!',
        description: 'Ping service endpoint and reply back with a message you specify in the activities settings.'
      }
    },
    arguments: {
      execute: {
        inArguments: [],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers.host}/modules/ping/execute`
      }
    },
    configurationArguments: {
      save: {
        url: `https://${req.headers.host}/modules/ping/save`
      },
      publish: {
        url: `https://${req.headers.host}/modules/ping/publish`
      },
      validate: {
        url: `https://${req.headers.host}/modules/ping/validate`
      },
      stop: {
        url: `https://${req.headers.host}/modules/ping/stop`
      }
    },
    userInterfaces: {
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true,
      }
    },
    schema: {
      arguments: {
        execute: {
          inArguments: [],
          outArguments: [{
            pong: {
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
