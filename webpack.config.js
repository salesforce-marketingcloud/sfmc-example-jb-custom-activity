const pingExample = require('./modules/ping/webpack.config');
const splitExample = require('./modules/customsplit/webpack.config');

module.exports = function(env, argv) {
    return [
        pingExample(env, argv),
        splitExample(env, argv),
    ];
};
