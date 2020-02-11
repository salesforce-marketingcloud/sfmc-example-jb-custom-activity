const config = {
  workflowApiVersion: '1.1',
  metaData: {
    icon: '/static/img/megaphone.svg',
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
      url: 'https://sfmc-example-custom-activity.herokuapp.com/ping/execute'
    }
  },
  configurationArguments: {
    save: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/ping/save'
    },
    publish: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/ping/publish'
    },
    validate: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/ping/validate'
    },
    stop: {
      url: 'https://sfmc-example-custom-activity.herokuapp.com/ping/stop'
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
      emptyIframe: true,
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
}

export default config;
