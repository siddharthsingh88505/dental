import bodyParser from "body-parser";
import express from "express";
import { router } from "./routers/web.js";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";

const app = express(); // initialize 


// static files
app.use(express.static('frontend'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// load routes
app.use("/", router);
app.set("view engine", "ejs");

connectDb(process.env.DATABASE_URL);

const port = 5400;
app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${port}`)
});
