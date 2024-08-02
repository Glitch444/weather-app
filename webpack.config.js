const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            {
                // Rule for processing images
                test: /\.(png|jpe?g|gif)$/i, // Regex to match image files
                type: 'asset/resource', // Handles image files as assets
            },
            {
                // Rule for processing HTML files
                test: /\.html$/, // Regex to match .html files
                use: ['html-loader'], // Handles HTML imports
            },

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template file
            filename: 'index.html', // Output file name
        }),
    ],

    devServer: {
        static: './dist', // Directory to serve static files from
        hot: true, // Enable hot module replacement
        open: true, // Open the browser after server has been started
    },

}