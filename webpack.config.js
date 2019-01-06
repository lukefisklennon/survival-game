var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
		{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}]
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	],
	devServer: {
		port: 3000
	}
};
