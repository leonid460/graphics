const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
console.log({ isDev });
console.log(isDev ? 'DEV MODE' : 'PROD MODE');

function jsLoaders() {
  return ['ts-loader'];
}

module.exports = {
  entry: './src/index.ts',
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devtool: isDev ? 'source-map' : false,

  devServer: {
    contentBase: './dist' //where contents are served from
  },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        include: path.resolve(__dirname, 'src/'),
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: jsLoaders(),
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // name of html file to be created
      template: './public/template.html' // source from which html file would be created
    }),
    new SourceMapDevToolPlugin({
      exclude: ['node_modules', 'dist']
    })
  ]
}
