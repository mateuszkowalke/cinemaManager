const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required()
})

exports.register = (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.send(error.details[0].message);
    User.findOne({ username: req.body.username })
        .then(doc => {
            if (doc) return { error: true, message: `User ${req.body.username} already exists.` }
            bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(req.body.password, salt))
                .then(password => {
                    const newUser = new User({
                        username: req.body.username,
                        password: password,
                        date: req.body.date
                    });
                    return newUser.save();
                })
        })
        .then(result => {
            if (result.error) {
                res.send(result.message);
            } else {
                res.send(`User ${result.username} successfully registered.`)
            }
        })
        .catch(err => console.error(err));
}

exports.login = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(doc => {
            if (!doc) {
                return { error: true, message: `No user ${req.body.username} found.` }
            } else {
                return bcrypt.compare(req.body.password, doc.password)
            }
        })
        .then(result => {
            if (result.error) {
                res.send(result.message);
            } else {
                const token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
                res.header('auth-token', token).send(`Successfully logged in.`);
            }
        })
        .catch(err => console.error(err));
}