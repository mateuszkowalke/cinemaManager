const app = require("./app");
const mongoose = require("mongoose");

//setup database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Connection to mongoDB Successful!"));

//start server
const port = process.env.PORT | 3000;
app.listen(port, () => console.log("Server is listening on port: " + port));