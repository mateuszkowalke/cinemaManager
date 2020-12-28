import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.send(`No JWT token - access denied.`);
    try {
        req.username = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    }
    catch (err) {
        return res.status(403).send(err);
    }
};
//# sourceMappingURL=verify_token.js.map