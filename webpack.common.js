const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

module.exports = (env) => {
  return {
    entry: './src/content/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, `dist/${env.BROWSER ?? 'chrome'}`),
      clean: true
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './src/icons', to: 'icons' },
        ],
      }),
      new MergeJsonWebpackPlugin({
        files: ["./src/manifest.json", `./src/manifest.${env.BROWSER ?? 'chrome'}.json`],
        output: {
          fileName: "manifest.json",
        },
      }),
    ],
  }
};
