// 내가 연결할 DB에 대한 정보

// 1) 설치 : npm i mysql2
// 2) require

const mysql = require('mysql2')

// 3) 나의 DB 정보를 기재
// 무조건 이렇게 적는게 아니라, DB 상태에 맞게 사용
let conn = mysql.createConnection({
    'host' : 'localhost', // 주소값
    'user' : 'root', // workbench 가서 확인
    'password' : '1234',
    'port' : 3306,
    'database' : 'nodejs'
})

conn.connect();

module.exports = conn;
// 내 mysql 정보를 가지고 연결한 conn을 모듈화해서
// 다른 파일에서도 사용하겠다!