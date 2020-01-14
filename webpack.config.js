const path = require('path');
const source = path.join(__dirname, '/client/src');
const destination = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: `${source}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: destination,
  },
  module: {
    rules: [{
        test: /\.jsx$/,
        include: source,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      }
    ]
  }
};