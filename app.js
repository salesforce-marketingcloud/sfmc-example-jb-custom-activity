const express = require('express');
const path = require('path');
require('body-parser');

const submodules = [
    require('./modules/ping/app'),
    require('./modules/customsplit/app'),
];

const app = express();
app.set('port', (process.env.PORT || 8080));
app.use('/', express.static(path.join(__dirname, 'home')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/@salesforce-ux/design-system/assets')));

submodules.forEach((sm) => sm(app, {
    rootDirectory: __dirname,
}));

app.listen(app.get('port'), function() {
    console.log(`Express is running at localhost: ${app.get('port')}`);
});
