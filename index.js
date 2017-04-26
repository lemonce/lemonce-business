'use strict';

process.env.VUE_ENV = 'server';

const isProd = process.env.NODE_ENV === 'production';

const fs = require('fs');
const http = require('http');
const path = require('path');
const https = require('https');
const express = require('express');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const serialize = require('serialize-javascript');

const app = express();
const httpServer = http.createServer(app);

// 读取模板html
const layout = (() => {
	const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
	return template;
})();

let renderer;
if (isProd) {
	loadConfig(require('./prod.config'));
	const bundlePath = path.resolve('./dist/server-bundle.js');
	renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'));
} else {
	loadConfig(require('./dev.config'));
    // 如果是开发环境,bundle会在改变之后重新回调生成
	require('./config/setup-dev-server')(app, bundle => {
		renderer = createBundleRenderer(bundle);
	});
}

function loadConfig(config) {
	for(let key in config) {
		process.env[key] = config[key];
	}
}


require('dotenv').load();
const config = require('./src/express.config');
config(app);

app.set('port', process.env.PORT);
app.set('sslport', process.env.SSLPORT);

app.use('/dist', express.static(path.resolve('./dist')));

app.get('/', (req, res) => {
	if (!renderer) {
		return res.end('waiting for compilation... refresh in a moment.');
	}
	const context = {};
	renderer.renderToString(
		context,
		function (err, html) {
			if(err) {
				console.log(err);
				return res.status(500).send('Server Error');
			}
			res.write(
				`<script>window.__INITIAL_STATE__=${
					serialize(context.initialState, {isJSON: true})
					}</script>`
			);
			res.end(layout.replace('<div id="app"></div>', html));
		}
	);
});

httpServer.listen(app.get('port'), function (err) {
	if (err) {
		throw err;
	}
	console.log('Server is running on port: ' + app.get('port'));
});

/**
 * https server
 */
try {
	const options = {
		key: fs.readFileSync(process.env.KEY),
		cert: fs.readFileSync(process.env.CERTIFICATE)
	};
	const httpsServer = https.createServer(options, app);
	httpsServer.listen(app.get('sslport'), function (err) {
		if (err) {
			throw err;
		}

		console.log('Server is running on port: ' + app.get('sslport'));
	});
} catch (err) {
	console.log(err);
}

module.exports = app;
