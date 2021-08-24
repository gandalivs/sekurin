const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.verifyToken = (req, res, next) => {

    if (req.url === "/login" || req.url === "/register") {
        return next();
    }

    const token = req.headers["tokenindo-access"];

    if (!token) {
        return res.status(403).send({
            message: `User not auth`
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_TOKEN);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};