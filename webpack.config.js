const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 9000,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
		/* cssをpublic/css/index.cssに書き出す */
		new MiniCssExtractPlugin({
			filename: "./css/index.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
	},
};
