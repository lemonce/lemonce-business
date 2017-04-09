const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPluginConfig = {
	template: 'index.html',
	filename: 'index.html',
	inject: 'body'
};
const cssnext = require('postcss-cssnext');

module.exports = {
	entry: './index.js',
	output: {
		path: resolve(__dirname, './dist'),
		filename: 'business.min.js'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				// transform own css
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader!postcss-loader'
			}, {
				// do not transform vendor css
				test: /\.css$/,
				include: /node_modules/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png|jpg|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000&name=res/[hash].[ext]',
			},{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
			}, { 
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				loader: 'file-loader' 
			},
		]
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
	},
	babel: {
		presets: ['es2015', 'stage-3'],
		plugins: ['transform-runtime']
	},
	postcss: function () {
		return [cssnext({
			browsers: ['last 2 versions', 'IE > 10']
		})];
	},
	plugins: [
		new HtmlWebpackPlugin(htmlPluginConfig),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.Tether': 'tether'
		})
	],
	devServer: {
		proxy: {
			'/business': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				pathRewrite: {
					'^/business': ''
				}
			},
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin(Object.assign(htmlPluginConfig, {
			minify: {}
		}))
	];
} else {
	module.exports.devtool = '#source-map';
}
