const rp = require('request-promise');
const HOST = 'http://139.129.225.83:8080/license';

exports.activate = function (userID, version, machineCode, period) {
    const options = {
        method: 'POST',
        uri: `${HOST}/new`,
        body: {
            period, version, machineCode,
            userID: String(userID)
        },
        json: true
    };
    return rp(options);
}

exports.delete = function (activeCode) {
    const options = {
        method: 'DELETE',
        uri: `${HOST}/delete`,
        body: {
            activeCode
        },
        json: true
    };
    return rp(options);
}
