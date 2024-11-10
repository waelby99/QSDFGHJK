const crypto =require("crypto")
const randomString =(length) => {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = {randomString}