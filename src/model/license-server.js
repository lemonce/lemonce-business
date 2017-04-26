const rp = require('request-promise');
const LICENSE_SERVER = process.env.LICENSE_SERVER;

exports.activate = function (userID, version, machineCode, period) {
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

exports.delete = function (id) {
	const options = {
		method: 'DELETE',
		uri: `${LICENSE_SERVER}/${id}`,
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
