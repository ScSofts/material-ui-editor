const path = require('path')

const webpackConfig = {
    entry: './src/index.jsx',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: "file-loader",
            query: {
                name: '[name].[ext]',
                outputPath: 'images/'
            }
        },
        {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }]
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './public'),
        port: 3000,
        inline: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'https://localhost:44301',
                secure: false,
                changeOrigin: true
            }
        }
    },

    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    }
}

module.exports = webpackConfig