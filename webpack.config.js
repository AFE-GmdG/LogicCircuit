/**
 * Webpack 4 configuration file (Terser Version)
 * see https://webpack.js.org/configuration/
 * see https://webpack.js.org/configuration/dev-server/
 * ©2019 - Andreas Friedel
 */

"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const process = require("process");
const easmTransformer = require('@easm/ts-plugin-transform');

const cwd = process.cwd();

module.exports = (env) => [{
	name: "TS-Nodes",

	mode: "none", // disable default webpack behavior - all settings are under our own control.

	target: "web",

	context: path.resolve(cwd, "src"),

	entry: {
		"app": [
			"./app.tsx"
		]
	},

	devtool: env === "release" || env === "docs" ? false : "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@microsoft/typescript-etw": "./_does_not_exist_"
		}
	},

	output: {
		filename: "[name].js",
		path: path.resolve(cwd, env === "docs" ? "docs" : "dist"),
		publicPath: "",
		globalObject: "self"
	},

	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [{
				loader: "ts-loader",
				options: {
					getCustomTransformers: program => ({
						before: [
							easmTransformer(program)
						]
					})
				}
			}]
		}]
	},

	optimization: {
		noEmitOnErrors: true,
		namedModules: env !== "docs",
		namedChunks: env !== "docs",
		minimize: false
	},

	plugins: [
		new webpack.IgnorePlugin(
			/^@microsoft(\/|\\)typescript-etw$/
		),
		new CopyWebpackPlugin([{
			from: path.resolve(cwd, "src/assets/*.css"),
			to: path.resolve(cwd, env === "docs" ? "docs" : "dist")
		}, {
			from: path.resolve(cwd, "src/assets/*.woff2"),
			to: path.resolve(cwd, env === "docs" ? "docs" : "dist")
		}, {
			from: path.resolve(cwd, "src/assets/*.ttf"),
			to: path.resolve(cwd, env === "docs" ? "docs" : "dist")
		}], {
			logLevel: "error"
		}),
		new HtmlWebpackPlugin({
			baseUrl: env === "docs" ? "https://a-friedel.github.io/LogicCircuit/" : "/",
			filename: "index.html",
			template: "index.html",
			inject: "body",
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		...(env === "release" || env === "docs") ? [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: "'production'",
					VERSION: JSON.stringify(require("./package.json").version)
				}
			})
		] : [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: "'development'",
					VERSION: JSON.stringify(require("./package.json").version)
				}
			})
		]
	],

	devServer: {
		historyApiFallback: true,
		public: "http://localhost:8083",
		disableHostCheck: true,
		port: 8083,
		contentBase: path.resolve(cwd, "dist"),
		compress: true,
		headers: {},
		host: "0.0.0.0",
		inline: true,
		hot: false,
		quiet: false,
		stats: {
			colors: true
		}
	}
}];
