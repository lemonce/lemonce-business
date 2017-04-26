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

//将html文件切割为头尾两部分,生成文件的时进行拼接
const html = (() => {
	const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
	const i = template.indexOf('{{ APP }}');
    //如果是开发调试状态,css会直接插入页面中,而不是应用文件
	const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : '';
	return {
		head: template.slice(0, i).replace('{{ STYLE }}', style),
		tail: template.slice(i + '{{ APP }}'.length)
	};
})();

let renderer;
if (isProd) {
	require('./prod.config');
	const bundlePath = path.resolve('./dist/server-bundle.js');
	renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'));
} else {
	require('./dev.config');
    // 如果是开发环境,bundle会在改变之后重新回调生成
	require('./config/setup-dev-server')(app, bundle => {
		renderer = createBundleRenderer(bundle);
	});
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
	const renderStream = renderer.renderToStream(context);

	let firstChunk = true;
	res.write(html.head);

	renderStream.on('data', chunk => {
		if (firstChunk) {
			if (context.initialState) {
				res.write(
                    `<script>window.__INITIAL_STATE__=${
						serialize(context.initialState, {isJSON: true})
                        }</script>`
				);
			}
			firstChunk = false;
		}
		res.write(chunk);
	});

	renderStream.on('end', () => {
		res.end(html.tail);
	});
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
// try {
// 	const options = {
// 		key: fs.readFileSync('./cert/private.pem'),
// 		cert: fs.readFileSync('./cert/file.crt')
// 	};
// 	const httpsServer = https.createServer(options, app);
// 	httpsServer.listen(app.get('sslport'), function (err) {
// 		if (err) {
// 			throw err;
// 		}

// 		console.log('Server is running on port: ' + app.get('sslport'));
// 	});
// } catch (err) {
// 	console.log(err);
// }

module.exports = app;
