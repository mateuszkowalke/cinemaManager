import { User, IUser } from '../models/user';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IError } from 'utils/error';
import { Request, Response } from "express";

const schema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required()
})

export const register = (req: Request, res: Response): void => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.send(error.details[0].message);
    } else {
        User.findOne({ username: req.body.username })
            .then((doc: IUser): Promise<IError | IUser> => {
                if (doc) return Promise.resolve({ kind: 'ierror', error: true, message: `User ${req.body.username} already exists.` });
                return bcrypt.genSalt(10)
                    .then((salt: string): Promise<string> => bcrypt.hash(req.body.password, salt))
                    .then((password: string): Promise<IUser> => {
                        const newUser = new User({
                            username: req.body.username,
                            password: password,
                            date: req.body.date
                        });
                        return newUser.save();
                    });
            })
            .then((result: IError | IUser): void => {
                if (result.kind === 'ierror') {
                    res.send(result.message);
                } else {
                    res.send(`User ${result.username} successfully registered.`)
                }
            })
            .catch(err => console.error(err));
    }
}

export const login = (req: Request, res: Response): void => {
    User.findOne({ username: req.body.username })
        .then((doc: IUser): Promise<boolean | IError> => {
            if (!doc) {
                return Promise.resolve({ kind: 'ierror', error: true, message: `No user ${req.body.username} found.` });
            } else {
                return bcrypt.compare(req.body.password, doc.password)
            }
        })
        .then((result: boolean | IError) => {
            if (typeof result !== 'boolean') {
                res.send(result.message);
            } else {
                const token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
                res.header('auth-token', token).send(`Successfully logged in.`);
            }
        })
        .catch(err => console.error(err));
}