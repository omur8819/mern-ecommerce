const express = require("express");
require("dotenv").config();
const dbConnect = require("./models/dbConnect");
const router = require("./routers/router");


//server
const app = express();
const port = process.env.port || 5000;
const host = "http://localhost"
app.listen(5000, () => {
    console.log(`I am listening on ${host}:${port}`);
})

//database connect
dbConnect();

app.use(express.json());
app.use("/api", router);