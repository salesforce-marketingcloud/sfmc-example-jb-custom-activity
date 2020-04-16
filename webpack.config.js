const pingWebpackConfig = require('./ping-example/webpack.config');

module.exports = function(env, argv) {
    return [pingWebpackConfig(env, argv)];
};
