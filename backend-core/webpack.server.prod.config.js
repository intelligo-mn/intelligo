const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: {
        app: ['./src/main.ts'],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {},
    },
    mode: 'production',
    node: {
        __filename: false,
        __dirname: false,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            use: 'ts-loader',
            test: /\.ts?$/,
            exclude: /node_module/,
        },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'prod',
        }),
    ],
    externals: {
        '@nestjs/microservices': 'nestjs/microservices',
        'cache-manager': 'cache-manager',
        'fastify-swagger': 'fastify-swagger',
    },
};
