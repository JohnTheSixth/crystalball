// webpack config for serverless-webpack-plugin

module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  target: 'node',
  externals: [
    /aws-sdk/, // Available on AWS Lambda
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            'env',
            {
              target: { node: '6.10' }, // Node version on AWS Lambda
              useBuiltIns: true,
              modules: false,
              loose: true,
            },
          ],
        ],
      },
    }],
  },
};
