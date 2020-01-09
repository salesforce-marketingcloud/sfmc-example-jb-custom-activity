'use strict';
module.exports = (app, express) => {

	var router = express.Router();

	var pingController = require('./controllers/pingController');

	// home page route (http://localhost:8080)
	router.get('/', function(req, res) {
	    res.send("these aren't the droids you're looking for!");
	});

	/**
	 * Controller: Ping Controller
	 */
	router.post('/ping/save', pingController.executeLifecycle);
	router.post('/ping/publish', pingController.executeLifecycle);
	router.post('/ping/validate', pingController.executeLifecycle);
	router.post('/ping/stop', pingController.executeLifecycle);
	router.post('/ping/execute', pingController.executePing);

	// apply the routes to our application
	app.use('/', router);
};
