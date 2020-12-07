//imports
const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth.js');

const app = express();

//mount middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mount paths
app.get('/', (req, res) => res.send('Cinema manager api'))
apiRoutes(app);
authRoutes(app);
app.use(function (req, res, next) {
    res.status(404)
        .type('text')
        .send('Page Not Found');
});

module.exports = app;