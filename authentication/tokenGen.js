const { hashString } = require('./encrypter');

// Generate a random token for the API
const tokenGen = () => {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    let encrypted = hashString(token);
    console.log(encrypted)
    return encrypted;
}

module.exports = { tokenGen };