const express = require('express');
const submodules = [
    require('./sfmc-index/app'),
    require('./ping-example/app'),
];
require('body-parser');

const app = express();
app.set('port', (process.env.PORT || 8080));

submodules.forEach((sm) => sm(app, {
    rootDirectory: __dirname,
}));

app.listen(app.get('port'), function() {
    console.log(`Express is running at localhost: ${app.get('port')}`);
});
