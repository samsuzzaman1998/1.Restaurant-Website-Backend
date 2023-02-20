const jwt = require("jsonwebtoken");

function JWTGenerator(part1, expireTime) {
    const token = jwt.sign(part1, process.env.JWT_SECRET, {
        expiresIn: expireTime,
    });
    return token;
}

module.exports = JWTGenerator;
