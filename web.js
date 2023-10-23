"use strict";

const express = require("express");
const app = express();
const home = require("./src/routes/home");
const PORT = 8000;

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use("/", home);

app.listen(PORT, () => {
    console.log("서버 가동");
});

module.exports = app;