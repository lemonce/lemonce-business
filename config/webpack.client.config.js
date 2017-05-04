const webpack = require('webpack');
const base = require('./webpack.base.config');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = Object.assign({}, base, {
	plugins: (base.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'client-vendor-bundle.js'
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency',
			environment: process.env.NODE_ENV
		}),
		new ExtractTextPlugin('styles.[hash:5].css'),
		new webpack.optimize.OccurrenceOrderPlugin()
	])
});

if (process.env.NODE_ENV === 'production') {
  
	const ExtractTextPlugin = require('extract-text-webpack-plugin');

	config.plugins.push(
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);
}

module.exports = config;