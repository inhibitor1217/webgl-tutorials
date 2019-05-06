var path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: '/node_modules'
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    }
}