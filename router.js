'use strict';
module.exports = (app, express) => {

	var router = express.Router();

	var pingController = require('./controllers/pingController');
	var customSplitController = require('./controllers/customSplitController');

	/**
	 * Controller: Ping Controller
	 */
	router.post('/ping/save', pingController.executeLifecycle);
	router.post('/ping/publish', pingController.executeLifecycle);
	router.post('/ping/validate', pingController.executeLifecycle);
	router.post('/ping/stop', pingController.executeLifecycle);
	router.post('/ping/execute', pingController.execute);

	// custom split server side information
	router.post('/customsplit/save', customSplitController.executeLifecycle);
	router.post('/customsplit/publish', customSplitController.executeLifecycle);
	router.post('/customsplit/validate', customSplitController.executeLifecycle);
	router.post('/customsplit/stop', customSplitController.executeLifecycle);
	router.post('/customsplit/execute', customSplitController.execute);

	// apply the routes to our application
	app.use('/', router);
};
