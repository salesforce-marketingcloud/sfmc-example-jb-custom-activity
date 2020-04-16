import config from './config';

const executeLifecycle = (req, res) => {
  return res.json({});
}

var execute = (req, res) => {

  var request = req.body;

  console.log('req', req === undefined ? 'empty' : 'has');
  console.log('req.body', req.body);

  // Find the in argument
  var getInArgument = (k) => {
    if (req.body && req.body.inArguments) {
      for (let i = 0; i < req.body.inArguments.length; i++) {
        let e = req.body.inArguments[i];
        if (k in e) {
          return e[k];
        }
      }
    }
    return;
  }

  // example: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/example-rest-activity.htm
  var path = getInArgument('path') || 'nothing';

  const status = 200;

  var sendResponse = () => {
    var responseObject = {
      branchResult: path
    };

    console.log('responseObject', JSON.stringify(responseObject));
    res
      .status(status)
      .json(responseObject);
  }

  sendResponse();
};

export default {
  name: 'customsplit',
  routes: [{
      path: '/config.json',
      method: 'GET',
      resolve: (req, res) => {
        // Return the JSON configuration
        console.log('req', req.headers['host']);
        res.status(200)
          .json(config(req));
      }
    },
    {
      path: '/save',
      method: 'POST',
      resolve: executeLifecycle
    },
    {
      path: '/publish',
      method: 'POST',
      resolve: executeLifecycle
    }, {
      path: '/validate',
      method: 'POST',
      resolve: executeLifecycle
    },
    {
      path: '/stop',
      method: 'POST',
      resolve: executeLifecycle
    },
    {
      path: '/execute',
      method: 'POST',
      resolve: execute
    }
  ]
};
