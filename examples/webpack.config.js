var webpack = require('webpack');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

var config = {
    resolve: {
        // .js is required for react imports.
        // .tsx is for our app entry point.
        // .ts is optional, in case you will be importing any regular ts files.
        extensions: ['.js', '.ts', '.tsx'],
        alias:{
            "react-animate-hoc": path.resolve(__dirname, "../src/index")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "tslint-loader",
                enforce: "pre"
            },
            {
                // Set up ts-loader for .ts/.tsx files and exclude any imports from node_modules.
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    context: path.resolve(__dirname),
    entry: {
        bundle: './src/index.tsx'
    },
    output: {
        filename: "./bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public_html")
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ]
};

if (!isProduction) {
    config.plugins.unshift(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
    config.devServer.hot = true;
} else {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;
