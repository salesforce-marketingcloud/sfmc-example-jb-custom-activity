const express = require('express');
const path = require('path');

module.exports = function(app, options) {
    const {rootDirectory} = options;

    // setup the sfmc index page
    app.use('/assets', express.static(path.join(rootDirectory, '/node_modules/@salesforce-ux/design-system/assets')));
    app.use('/', express.static(path.join(rootDirectory, 'sfmc-index/static')));

};
