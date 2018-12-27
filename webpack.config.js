const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "index.jsx"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "byteConverter.js",
    library: "byte-converter",
    libraryTarget: "umd"
  },
  externals: ["react", "react-dom"],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/react"]
        }
      }
    ]
  }
};
