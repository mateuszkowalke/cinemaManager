//imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth.js');

//instantiate express server
const app = express();

//load .env
dotenv.config();

//setup database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Connection to mongoDB Successful!"));

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

//start server
const port = process.env.PORT | 3000;
app.listen(port, () => console.log("Server is listening on port: " + port));