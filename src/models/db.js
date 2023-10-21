const mysql = require('mysql');

// 연결할 DB 정보입력
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '비번',
    database: 'DB 이름',
    port: '3306',
});

// 데이터베이스 연결
db.connect();

// SHOW 쿼리문 사용
db.query('SHOW TABLES', (error, results) => {
    if (error) throw error;
    console.log(results);
})

// 연결 종료
// db.end();

// 모듈로 내보내기
module.exports = db;