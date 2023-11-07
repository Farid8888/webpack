const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization =()=>{
    const config = {
        splitChunks:{
            chunks:'all'
        }, 
}
if(isProd){
    config.minimizer=[
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ]
    config.minimize = true  
}
return config
}
console.log(isDev,'isdev')
console.log(isProd,isProd)

const babelOptions =(ext)=>{
    const config={
        presets: [
          '@babel/preset-env',
        ]
      }
  if(ext){
    config.presets.push(ext)
  }
  return config
}
const useLoaders =()=>{
    const loaders =[{
        loader:'babel-loader',
        options:babelOptions()
    }]
    if(isDev){
        loaders.push('eslint-loader')
    }
    return loaders
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoaders =(extra)=>{
    const loaders =[
        {
        loader:MiniCssExtractPlugin.loader,
        options:{},
        },
        'css-loader']
 if(extra){
    loaders.push(extra)
 }
 return loaders
}
module.exports={
context:path.resolve(__dirname,'src'),
mode:"development",    
entry:{
    main:['@babel/polyfill', './index.jsx'],
    analithycs:"./analithycs.ts"
},
output:{
    filename:filename('.js'),
    path:path.resolve(__dirname,'dist'),
    clean:true
},
optimization:optimization(),
devServer:{
port:4200,
hot:isDev
},
devtool:isDev && 'source-map' ,
resolve:{
    extensions:['.js','.json'],
    alias:{
        '@post':path.resolve(__dirname,'src/Post'),
        '@xml':path.resolve(__dirname,'src/assets/data.xml')
    }
},
plugins:[
    new HtmlWebpackPlugin({
        title:'khalifa',
        template:'./index.html',
        minify:{
            collapseWhitespace:isProd
        }
    }),
    new WebpackPlugin({
        patterns:[
            {
                from:path.resolve(__dirname,'src/favicon.ico'),
                to:path.resolve(__dirname,'dist')
            }
        ]
    }
),
new MiniCssExtractPlugin({
    filename:filename('.css'),
    chunkFilename: isDev ? "[id].css" : "[id].[contenthash].css",
}),
new ESLintPlugin()
],
module:{
    rules:[
        {
            test:/\.css$/,
            use:cssLoaders()
        },
        {
            test:/\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            type:"asset"
        },
        {
            test:/\.xml$/,
            use:["xml-loader"]
        },
        {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
          },
        {
            test:/\.less$/,
            use:cssLoaders('less-loader')
        },
        {
            test:/\.s[ac]ss$/,
            use:cssLoaders('sass-loader')
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: babelOptions()
            }
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: babelOptions('@babel/preset-typescript')
            }
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: babelOptions('@babel/preset-react')
            }
          }
    ]
}

}