"use strict";

const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");
const connectdb = require("./app/config/config_db")

var corsOptions = {
    origin: "http://localhost:4200"
};

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connectdb();
app.use(cors(corsOptions));
app.use(express.json());
require('./app/models/index.js');
app.use(require("./app/router/index"));
app.listen(PORT, () => {
    console.log(`The app is in 127.0.0.1:${PORT}`);
})//listen