const config = require('../../prod.config');
const rp = require('request-promise');
const LICENSE_SERVER = config.LICENSE_SERVER;
const LICENSE_ACTIVATE_PERIOD = parseInt(config.LICENSE_ACTIVATE_PERIOD);

exports.activate = function (userID, version, machineCode, period = LICENSE_ACTIVATE_PERIOD) {
	const options = {
		method: 'POST',
		uri: `${LICENSE_SERVER}/new`,
		body: {
			period, version, machineCode,
			userID: String(userID)
		},
		json: true
	};
	return rp(options);
};

exports.delete = function (code) {
	const options = {
		method: 'DELETE',
		uri: `${LICENSE_SERVER}/${code}`,
		json: true
	};
	return rp(options);
};

exports.getListByUser = function (userId) {
	const options = {
		uri: `${LICENSE_SERVER}`,
		qs: {userId},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};
	return rp(options);
};
