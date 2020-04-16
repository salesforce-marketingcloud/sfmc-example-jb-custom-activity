const pingExample = require('./ping-example/webpack.config');
const splitExample = require('./split-example/webpack.config');

module.exports = function(env, argv) {
    return [
        pingExample(env, argv),
        splitExample(env, argv),
    ];
};
