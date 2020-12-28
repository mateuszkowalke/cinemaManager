import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void | Response => {
    const token: string = req.header('auth-token');
    if (!token) return res.send(`No JWT token - access denied.`);
    try {
        req.username = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch (err) {
        return res.status(403).send(err);
    }
}