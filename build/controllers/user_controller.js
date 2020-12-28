import { User } from '../models/user';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { jwt } from 'jsonwebtoken';
const schema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required()
});
export const register = (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.send(error.details[0].message);
    }
    else {
        User.findOne({ username: req.body.username })
            .then((doc) => {
            if (doc)
                return Promise.resolve({ kind: 'ierror', error: true, message: `User ${req.body.username} already exists.` });
            return bcrypt.genSalt(10)
                .then((salt) => bcrypt.hash(req.body.password, salt))
                .then((password) => {
                const newUser = new User({
                    username: req.body.username,
                    password: password,
                    date: req.body.date
                });
                return newUser.save();
            });
        })
            .then((result) => {
            if (result.kind === 'ierror') {
                res.send(result.message);
            }
            else {
                res.send(`User ${result.username} successfully registered.`);
            }
        })
            .catch(err => console.error(err));
    }
};
export const login = (req, res) => {
    User.findOne({ username: req.body.username })
        .then((doc) => {
        if (!doc) {
            return Promise.resolve({ kind: 'ierror', error: true, message: `No user ${req.body.username} found.` });
        }
        else {
            return bcrypt.compare(req.body.password, doc.password);
        }
    })
        .then((result) => {
        if (typeof result !== 'boolean') {
            res.send(result.message);
        }
        else {
            const token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
            res.header('auth-token', token).send(`Successfully logged in.`);
        }
    })
        .catch(err => console.error(err));
};
//# sourceMappingURL=user_controller.js.map