import { app } from "./app";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Connection to mongoDB Successful!"));

const port = Number(process.env.PORT) | 3000;
app.listen(port, () => console.log("Server is listening on port: " + port));