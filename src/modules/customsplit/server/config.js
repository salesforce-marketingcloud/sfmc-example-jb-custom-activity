const config = {
  workflowApiVersion: '1.1',
  metaData: {
    ico ': ' / static / img / customsplit.svg ',
    category: 'customer'
  },
  type: 'REST',
  lang: {
    'en-US': {
      name: 'Custom Split!',
      description: 'An example of a custom split activity.'
    }
  },
  arguments: {
    execute: {
      inArguments: [],
      outArguments: [],
      url: 'https://sfmc-example-custom-activity.herokuapp.com/customsplit/execute'
    }
  },
  configurationArguments: {
    save: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/customsplit/save'
    },
    publish: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/customsplit/publish'
    },
    validate: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/customsplit/validate'
    },
    stop: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/customsplit/stop'
    }
  },
  userInterfaces: {
    configModal: {
      height: 550,
      width: 500,
      fullscreen: false
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
        'label': 'Purchased Item'
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

export default config;
