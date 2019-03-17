module.exports = {
    entry: "./src/index.js",
    output: {
        path: `${__dirname}/public/scripts`
    },
    plugins: [],
    devtool: "source-map",
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-react"]]
                        }
                    }
                ]
            }
        ]
    }
};