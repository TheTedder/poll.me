const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
environment.plugins.prepend('Environment',
  new Dotenv()
)

environment.plugins.prepend('Provide',
new webpack.ProvidePlugin({
  $: 'jquery/src/jquery',
  jQuery: 'jquery/src/jquery'
})
)


module.exports = environment
