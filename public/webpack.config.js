const {join} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cleanWebpackConfig = {
    dry: false, // Display what files will be removed and not actually remove them, or actually remove them
    cleanStaleWebpackAssets: false,
    protectWebpackAssets: false,
    cleanOnceBeforeBuildPatterns: ['content'] // Relative to the output path of the webpack config object
};

module.exports = (env, options) => {
    const mode = options.mode;

    if(mode !== "development" && mode !== "production") {
        return console.log("You need to specify a mode.");
    }

    return { // Webpack config object
        mode: mode,
        devtool: mode === "development" ? 'inline-source-map' : undefined,
        entry: join(__dirname, 'src', 'entry.js'),
        resolve: {
            extensions: ['.js', '.ts', '.scss'],
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.ts$/i,
                    use: [
                        'ts-loader'
                    ]
                }
            ]
        },
        output: {
            hashDigestLength: 32,
            path: join(__dirname, 'public'), // this is the output path
            filename: 'content/js/[contenthash].js'
        },
        plugins: [
            new CleanWebpackPlugin(cleanWebpackConfig),
            new MiniCssExtractPlugin({
                filename: 'content/css/[contenthash].css',
                chunkFilename: 'content/css/[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: join(__dirname, 'src', 'templates', 'index.html'),
                filename: 'index.html',
                chunks: ['main']
            })
        ]
    };
}

// build: cd frontend,`npm run build`