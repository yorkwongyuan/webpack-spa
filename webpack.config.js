const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require("connect-history-api-fallback");
const convert = require('koa-convert');
const dev = Boolean(process.env.WEBPCK_SERVE)

module.exports = {
    mode: dev?'deveplopment':'production',
    devtool: dev ? 'cheap-module-eval-source-map':'hidden-source-map',
    entry:'./src/index.js',
    output:{
        path:resolve(__dirname,'dist'),
        filename:'index.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[{
                    loader:'babel-loader',
                    query:{
                        presets:['env']
                    }
                },'eslint-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif|woff|svg|svgz)(\?.+)?&/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            chunksSortMode: 'none'
        })
    ]
}

if(dev){
    module.exports.serve={
        port:8888,
        add: app=>{
            app.use(convert(history()))
        }
    }
}