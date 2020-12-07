const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.send(`No JWT token - access denied.`);
    try {
        req.username = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch (err) {
        res.status(403).send(err);
    }
}