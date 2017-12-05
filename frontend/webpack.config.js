module.exports = {
  entry: './app/components/Main.jsx',
  output: {
    filename: 'public/bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
          },
        },
      ],
    }],
  },
};
