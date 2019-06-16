var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var fs = require("fs")

var dirs = {
	"images": ["png"]
}

var data = {}
for (var dir in dirs) {
	data[dir] = fs.readdirSync("./src/" + dir).filter(file => {
		return dirs[dir].includes(file.split(".")[1])
	})
}

fs.writeFileSync("./src/assets.json", JSON.stringify(data))

module.exports = {
	mode: "development",
	output: {
		filename: "[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
        rules: [
			{
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
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					"file-loader"
				]
			}
		]
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	],
	devServer: {
		port: 3000
	}
}
