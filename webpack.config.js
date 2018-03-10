require('webpack');
const path = require('path');

module.exports = {
    entry: [
        path.join(__dirname, 'index.jsx'),
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }],
        }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: `${__dirname}/build`,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname,
    },
};
