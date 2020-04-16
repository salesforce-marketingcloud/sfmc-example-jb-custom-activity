const PACKAGE = require('../package.json');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function(env, argv) {
    return {
        // change the mode and devtool based on the env switch
        mode: 'development',
        devtool: 'cheap-source-map',
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'split-activity.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.less$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'split-activity.css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'build/index.ejs'),
                templateParameters: {
                    // optional CSP to use in your html header.
                    // we'll allow everything for the example but you may want to change this
                    // in production builds
                    contentSecurityPolicy: 'default-src \'self\'; connect-src *',
                },
            }),
            new CopyPlugin([
                {
                    // you may want to bundle SLDS SASS files with webpack,
                    // we'll keep things simple for this example and just copy SLDS into dist
                    from: path.resolve(__dirname, '../node_modules/@salesforce-ux/design-system/assets'),
                    to: path.resolve(__dirname, 'dist/design-system')
                },
            ]),
            new webpack.BannerPlugin(
                `${PACKAGE.author} - ${PACKAGE.description} SPLIT EXAMPLE`
            ),
        ]
    };
};
