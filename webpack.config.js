//
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const globImporter = require('node-sass-glob-importer')

module.exports = env => {
	console.log('\x1b[36m%s\x1b[0m', `>>>>>>> Webpack mode: ${env}`)

	// .env
	const envDef = `${path.join(__dirname)}/.env`
	const envMode = `${envDef}.${env}`
	const envFile = fs.existsSync(envMode) ? envMode : envDef
	console.log('----------------------\n', envFile)

	let envKeys
	if (fs.existsSync(envFile)) {
		console.log('\x1b[36m%s\x1b[0m', `>>>>>>> ENV:`)
		const envParsed = dotenv.config({ path: envFile }).parsed
		console.log('----------------------\n', envParsed, '\n----------------------')
		envKeys = Object.keys(envParsed).reduce((agr, curr) => {
			console.log('----------------------\n', agr)
			agr[`process.env.${curr}`] = JSON.stringify(envParsed[curr])
			return agr
		}, {})
		console.log('----------------------\n', envKeys)
		console.log('----------------------\n')
	}

	const wpPlugins = [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/ph.style.css'
		})
	]
	fs.existsSync(envFile) && wpPlugins.push(new webpack.DefinePlugin(envKeys))

	return {
		entry: './src/index.js',
		output: {
			path: path.join(__dirname, '/public'),
			filename: 'js/ph.bundle.js',
			publicPath: '/'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.(s?css)$/,
					use: [
						{
							loader: 'css-hot-loader',
							options: {}
						},
						{
							loader: MiniCssExtractPlugin.loader,
							options: {}
						},
						{
							loader: 'css-loader',
							options: {}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								importer: globImporter()
							}
						}
					]
				},
				{
					test: /\.(ico|png|jpe?g|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images'
							}
						}
					]
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts'
							}
						}
					]
				}
			]
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: wpPlugins
	}
}
