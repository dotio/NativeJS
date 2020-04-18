const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: ['babel-polyfill', './source/app.js']
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'app.[contenthash:8].js'
	},
	module: {
		rules: [{
				test: /.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			},
			// {
			// 	test: /.js$/,
			// 	exclude: /(node_modules)/,
			// 	//use: ['eslint-loader']
			// },
			{
				test: /\.handlebars$/,
				loader: "handlebars-loader"
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
				options: {
					noquotes: true
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[hash:8].[ext]',
						outputPath: 'assets/'
					}
				}]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				handlebarsLoader: {}
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'style/[contenthash:8].css',
		}),
		new HtmlWebpackPlugin({
			title: 'GitHub Finder| Find your friend',
			template: './source/index.handlebars',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
		})
	]
}