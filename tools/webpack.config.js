const webpack = require('webpack');
const path = require('path')
const nodeExternals = require('webpack-node-externals')
let DEV = true
if (process.argv.includes('--release')) {
   DEV = false
}
const base = {

}

let nodeConfig =  {
    entry: {
        app: ["babel-polyfill", path.resolve(__dirname, '../src/app.js')]
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js'
    },
    resolve: {
        modules: ['node_modules', 'src']
    },
    externals: [nodeExternals({importType:'commonjs',whitelist:[]})],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','stage-2']
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        ...(DEV ? [] : [
          new webpack.optimize.UglifyJsPlugin(),
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':DEV ? '"development"' :'"production"',
            __DEV__: DEV
        }),
    ]
};
if(!DEV){
   config.entry.start = path.resolve(__dirname, '../pm2/index.js')
}

module.exports = {
  nodeConfig
}
