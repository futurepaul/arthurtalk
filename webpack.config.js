module.exports = {
    entry: "./app/main.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { text: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'}
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx']
    }
};