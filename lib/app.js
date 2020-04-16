const express = require('express');
const sfmcIndexRoutes = require('./sfmc-index/routes');
const pingExampleRoutes = require('./ping-example/routes');
require('body-parser');

const app = express();
app.set('port', (process.env.PORT || 8080));

sfmcIndexRoutes(app);
pingExampleRoutes(app);

app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(app.get('port'), function() {
    console.log('Express is running at localhost:' + app.get('port'));
});

