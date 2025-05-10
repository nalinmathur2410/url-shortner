const crypto = require("crypto");

function generateHash(url) {
    const hash = crypto.createHash("sha256").update(url).digest("base64url");
    return hash.slice(0, process.env.HASH_LENGTH);
}

module.exports = generateHash;
