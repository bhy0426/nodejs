"use strict";

const db = require("../../models/db");
const table = require("../../models/UserStorage");

const GET = {

};

const POST = {
    goalsetting: (req, res) => {
        db.query("쿼리문", (error, rows) => {
            if(error) throw error;
            
            // rows 출력값
            // SELECT로 검색하면 검색한 값이 rows에 나와
        });
    },
};

module.exports = {
    GET,
    POST,
};