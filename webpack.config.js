const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: process.env.NODE_ENV || 'production',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
}