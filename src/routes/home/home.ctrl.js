"use strict";

const db = require("../../models/db");
const table = require("../../models/UserStorage");

const GET = {
    root: (req, res) => {
        res.send("Root");
    },
};

const POST = {
    calendar: (req, res) => {
        console.log("캘린더 접속")
        db.query("SELECT * FROM test_TB", (error, rows) => {
            if(error) throw error;
            console.log(rows);
            res.send(rows);
        })
    },
};

module.exports = {
    GET,
    POST,
};