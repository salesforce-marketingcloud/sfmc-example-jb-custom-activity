// Takes the config and returns the config with the fully qualified paths based on the domain that is hosting it.
const config = (req) => {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `https://${req.headers['host']}/img/customsplit.svg`,
      category: 'customer'
    },
    type: 'REST',
    lang: {
      // Internationalize your language here!
      'en-US': {
        name: 'Custom Split!',
        description: 'An example of a custom split activity.'
      }
    },
    arguments: {
      execute: {
        inArguments: [],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers['host']}/modules/customsplit/execute`
      }
    },
    configurationArguments: {
      save: {
        url: `https://${req.headers['host']}/modules/customsplit/save`
      },
      publish: {
        url: `https://${req.headers['host']}/modules/customsplit/publish`
      },
      validate: {
        url: `https://${req.headers['host']}/modules/customsplit/validate`
      },
      stop: {
        url: `https://${req.headers['host']}/modules/customsplit/stop`
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
    outcomes: [{
        arguments: {
          branchResult: 'no_action',
          'some argument': 'passed from config.json for hold_item'
        },
        metaData: {
          label: 'No Activity'
        }
      },
      {
        arguments: {
          branchResult: 'viewed_item',
          'some argument': 'passed from config.json for hold_item'
        },
        metaData: {
          label: 'Viewed Item'
        }
      },
      {
        arguments: {
          branchResult: 'abandoned_cart',
          'some argument': 'passed from config.json for sell_item'
        },
        metaData: {
          label: 'Abandoned Cart'
        }
      },
      {
        arguments: {
          branchResult: 'purchased_item',
          'some argument': 'passed from config.json for buy_item'
        },
        metaData: {
          label: 'Purchased Item'
        }
      }
    ],
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
