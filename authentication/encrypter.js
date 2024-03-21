const crypto = require('crypto');

const hashString = (string) => {
    const hash = crypto.createHash('sha256');
    hash.update(string);
    return hash.digest('hex');
}

module.exports = { hashString }