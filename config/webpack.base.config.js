const {resolve} = require('path');
const cssnext = require('postcss-cssnext');

module.exports = {
	devtool: '#source-map', 
	entry: {
		app: './fe/client-entry.js',
		vendor: ['vue', 'vuex', 'vue-router', 'vue-resource']
	},
	output: {
		path: resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'client-bundle.js'
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
				test: /\.(png|jpg|svg|gif)$/,
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
	postcss: function () {
		return [cssnext({
			browsers: ['last 2 versions', 'IE > 10']
		})];
	}
};