const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.send(`No JWT token - access denied`);
    try {
        req.user_id = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        console.error(err);
    }
}