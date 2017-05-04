const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

// 开发调试的server-bundle
module.exports = (app, opt) => {
	clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	);

	const clientCompiler = webpack(clientConfig);
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	});
	app.use(devMiddleware);

	clientCompiler.plugin('done', () => {
		const fs = devMiddleware.fileSystem;
		const filePath = path.join(clientConfig.output.path, 'index.html');
		if (fs.existsSync(filePath)) {
			const index = fs.readFileSync(filePath, 'utf-8');
			opt.indexUpdated(index);
		}
	});
	app.use(require('webpack-hot-middleware')(clientCompiler));

	const serverCompiler = webpack(serverConfig);
	const mfs = new MFS();
	const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);
	serverCompiler.outputFileSystem = mfs;
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		stats.errors.forEach(err => console.error(err));
		stats.warnings.forEach(err => console.warn(err));
		opt.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'));
	});
};
