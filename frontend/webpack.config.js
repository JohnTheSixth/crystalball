const webpack = require('webpack');

module.exports = {
  entry: './app/components/Main.jsx',
  output: {
    filename: 'public/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-2'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /flexboxgrid/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        AUTHKEY: JSON.stringify(process.env.DW_AUTHKEY),
      },
    }),
  ],
};
