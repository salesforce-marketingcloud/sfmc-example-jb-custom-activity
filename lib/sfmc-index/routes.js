const express = require('express');
const path = require('path');

const APP_ROOT = path.join(__dirname, '../..');

module.exports = function pingExampleRoutes(app) {
    const examplePath = path.join(APP_ROOT, 'sfmc-index');

    // expose SLDS for the sfmc-example landing page, it's not recommended to do this for production apps
    app.use('/assets', express.static(`${APP_ROOT}/node_modules/@salesforce-ux/design-system/assets`));

    app.use('/', express.static(examplePath));

};
