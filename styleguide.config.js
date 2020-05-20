module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },
  components: 'src/**/*.js',
  ignore: [
    '**/*/index.js'
  ]
}
