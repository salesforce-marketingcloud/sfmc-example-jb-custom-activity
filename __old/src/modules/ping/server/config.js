const config = (req) => {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `https://${req.headers['host']}/img/megaphone.svg`,
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
        inArguments: [],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers['host']}/modules/discount-code/execute`
      }
    },
    configurationArguments: {
      save: {
        url: `https://${req.headers['host']}/modules/discount-code/save`
      },
      publish: {
        url: `https://${req.headers['host']}/modules/discount-code/publish`
      },
      validate: {
        url: `https://${req.headers['host']}/modules/discount-code/validate`
      },
      stop: {
        url: `https://${req.headers['host']}/modules/discount-code/stop`
      }
    },
    userInterfaces: {
      /*
      configModal: {
        height: 550,
        width: 500,
        fullscreen: false
      },
      */
      configInspector: {
        size: "scm-lg"
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
}

export default config;
