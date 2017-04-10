const rp = require('request-promise');
const HOST = 'http://139.129.225.83:8080/license';

exports.create = function (userID, version, period) {
    const options = {
        method: 'POST',
        uri: `${HOST}/new`,
        body: {
            userID, period, version
        },
        json: true
    }
    return rp(options);
}
