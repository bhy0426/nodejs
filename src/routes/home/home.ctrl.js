"use strict";

const db = require("../../models/db");
const table = require("../../models/UserStorage");

const GET = {
    // GET/root
    root: (req, res) => {
        res.send("여기는 루트입니다.");
    },

    // GET/login
    // tb_login에 Login_TB 내용 저장
    login: (req, res) => {
        res.send("여기는 로그인입니다.");
        db.all('SELECT * FROM Login_TB', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            table.tb_login = rows;
            console.log(table.tb_login);
        });
    },

    // GET/signup
    // tb_login Login_TB 내용 저장
    // tb_member에 Member_TB 내용 저장
    // tb_manSeq에 행 수 저장
    signup: (req, res) => {
        res.send("여기는 회원가입입니다.");
        // tb_login Login_TB 내용 저장
        db.all('SELECT * FROM Login_TB', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            table.tb_login = rows;
            console.log(table.tb_login);
        });
        // tb_member에 Member_TB 내용 저장
        db.all('SELECT * FROM Member_TB', (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            table.tb_member = rows;
            console.log(table.tb_member);
        });
        // tb_manSeq에 행 수 저장
        db.serialize(() => {
            db.get('SELECT COUNT(*) AS count FROM Member_TB', (err, row) => {
                if (err) {
                    console.error(err.message);
                }

                table.tb_manSeq = row.count;
                console.log("row : " + table.tb_manSeq);
            });
        });
    },

    // GET/user/calendar
    calendar: (req, res) => {
        res.send("여기는 캘린더에요");
    },

    // GET/user/timer/ranking
    ranking: (req, res) => {
        res.send("여기는 랭킹이에요");
    },
};

const POST = {
    // POST/login
    // 
    login: (req, res) => {
        console.log(req.body);

        // -1 : 요청 성공
        // 1 : ID를 찾을 수 없음
        // 2 : ID에 대응하는 PW를 찾을 수 없음
        // 3 : 토큰에 일치하는 사용자를 찾을 수 없음
        var detail_code = 0, token;
        const id_client = req.body.id,
            pw_client = req.body.pw;

        let sqlrun = "SELECT * FROM Login_TB WHERE id='" + id_client + "'";
        db.get(sqlrun, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row != null) {
                if (row.id == id_client) {
                    //console.log("아이디 찾기 성공");
                    if (row.pw == pw_client) {
                        console.log("로그인 성공");
                        detail_code = -1;
                        token = "success";
                    }
                    else {
                        console.log("비밀번호가 일치하지 않습니다.");
                        detail_code = 2;
                        token = null;
                    }
                }
                else {
                    console.log("아이디가 일치하지 않습니다.");
                    detail_code = 1;
                    token = null;
                }
            }
            else {
                console.log("DB에 존재하지 않는 아이디입니다.");
                detail_code = 2;
                token = null;
            }
            // 로그인 결과를 res.json으로 반환
            res.json({
                "detailCode": detail_code,
                "data": {
                    "token": token
                }
            });
        });
    },

    // POST/signup
    signup: (req, res) => {
        console.log(req.body);

        // -1 : 요청 성공
        // 11 : 이미 존재하는 ID
        // 12 : 이미 존재하는 닉네임
        var detail_code = 0;
        console.log(table.tb_manSeq);
        const id_client = req.body.id,
            pw_client = req.body.pw,
            name_client = req.body.name,
            nickname_client = req.body.nickname,
            email_client = req.body.email;

        let sqlrun = "SELECT * FROM Member_TB WHERE id='" + id_client + "'";

        db.get(sqlrun, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // 이미 존재하는 아이디가 있으면
            if (row != null) {
                detail_code = 11;
                return console.log("이미 동일한 아이디가 존재합니다.");
            }
            else {
                db.get("SELECT * FROM Member_TB WHERE nickname='" + nickname_client + "'", (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    // 이미 존재하는 닉네임이 있으면
                    if (row != null) {
                        detail_code = 12;
                        return console.log("이미 동일한 닉네임이 존재합니다.")
                    }
                    else {
                        // Login_TB에 id, pw 저장
                        db.run('INSERT INTO Login_TB (id, pw) VALUES (?, ?)',
                            [id_client, pw_client],
                            (err) => {
                                if (err) {
                                    return console.error(err.message);
                                }
                            })
                        // Member_TB에 manSeq, id, name, nickname, email 저장
                        db.run('INSERT INTO Member_TB (member_manageSeq, id, name, nickname, email) VALUES (?, ?, ?, ?, ?)',
                            [table.tb_manSeq, id_client, name_client, nickname_client, email_client],
                            (err) => {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log("회원가입 성공");
                                detail_code = -1;
                            });
                    }
                });
            }
            res.json({
                "detailCode": detail_code,
                "data": null
            });
        });
    }
};

module.exports = {
    GET,
    POST,
};