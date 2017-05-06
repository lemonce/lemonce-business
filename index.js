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
const devServer = require('./config/setup-dev-server');

const app = express();
const httpServer = http.createServer(app);

const parseHTML = tmpl => {
	const placeholder = '{{ APP }}';
	const i = tmpl.indexOf(placeholder);
	return {
		head: tmpl.slice(0, i),
		tail: tmpl.slice(i + placeholder.length)
	};
};

const parseMeta = (head) => {
	const title = process.env.PAGE_TITLE;
	const description = process.env.PAGE_DESCRIPTION;
	const keywords = process.env.PAGE_KEYWORDS;
	head = head.replace(/(<title>)(.*?)(<\/title>)/, `$1${title}$3`);
	head = head.replace(/(<meta name=description content=")(.*?)(">)/, `$1${description}$3`);
	head = head.replace(/(<meta name=keywords content=")(.*?)(">)/, `$1${keywords}$3`);
	return head;
};

let renderer;
let indexHTML;

if(isProd) {
	loadConfig(require('./prod.config'));
	renderer = createBundleRenderer(fs.readFileSync(path.resolve('./dist/server-bundle.js'), 'utf-8'));
	indexHTML = parseHTML(fs.readFileSync(path.resolve('./dist/index.html'), 'utf-8'));
} else {
	loadConfig(require('./dev.config'));
	devServer(app, {
		indexUpdated: index => {
			indexHTML = parseHTML(index);
		},
		bundleUpdated: bundle => {
			renderer = createBundleRenderer(bundle);
		}
	});
}

function loadConfig(config) {
	for(let key in config) {
		if(config[key] instanceof Array) {
			process.env[key] = config[key].join(',');
		} else {
			process.env[key] = config[key];
		}
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
	res.setHeader('Content-Type', 'text-html');
	const context = {};
	const renderStream = renderer.renderToStream(context);

	renderStream.once('data', () => {
		res.write(parseMeta(indexHTML.head));
	});

	renderStream.on('data', chunk => {
		res.write(chunk);
	});

	renderStream.on('end', () => {
		if(context.initialState){
			res.write(
				`<script>window.__INITIAL_STATE__=${
					serialize(context.initialState, {isJSON: true})
				}</script>`
			);
		}

		res.end(indexHTML.tail);
	});

	renderStream.on('error', err => {
		if(err && err.code == '404'){
			res.status(404).end('404, Page Not Found');
			return;
		}
		res.status(500).end('500 Internal Error');
		console.log(err);
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
let httpsServer;
try {
	const options = {
		key: fs.readFileSync(process.env.KEY),
		cert: fs.readFileSync(process.env.CERTIFICATE)
	};
	httpsServer = https.createServer(options, app);
	httpsServer.listen(app.get('sslport'), function (err) {
		if (err) {
			throw err;
		}

		console.log('Server is running on port: ' + app.get('sslport'));
	});
} catch (err) {
	console.log(err);
}

module.exports = {app, httpServer, httpsServer};
