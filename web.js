"use strict";

const express = require("express");
const app = express();
const home = require("./src/routes/home");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use("/", home);

module.exports = app;