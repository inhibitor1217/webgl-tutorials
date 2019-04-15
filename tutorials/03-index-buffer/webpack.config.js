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
        extensions: ['.ts']
    }
}