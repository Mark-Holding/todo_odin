const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: {
      directory: './dist',
    },
    open: true,  // Automatically opens browser when the server starts
  },
});