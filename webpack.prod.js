const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    plugins: [
      new ZipPlugin({
        filename: `qtest-manager-assistant.${env.BROWSER ?? 'chrome'}.zip`,
        include: [/\.json/, /\.js/, /icons/],
      }),
    ]
  });
}
