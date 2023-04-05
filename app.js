//express
const express = require('express');
const app = express();

//path, fs
const path = require('path');
const fs = require('fs');

//express 모듈에 body-parser내장
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//method-override for RESTFUL API
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//dotenv
require('dotenv').config()

//Static File (/ 라우터 포함)
app.use(express.static('public'));

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//CORS
const cors = require('cors');
app.use(cors({
  origin: true,
  credentials: true
}));


//MongoDB Atlas Setting
const dbURL = 'mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PW + process.env.DB_URL;

const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
const client = new MongoClient(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  db = client.db('project1');

  app.listen(8080, () => {
    console.log('listening on 8080');
  });

});





//MySQL 추가

// const mysql = require('mysql');
// const mysqlConn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : process.env.DB_ID,
//   database : 'blog'
// });


let mysqlDB;

const mysql = require("mysql2/promise");
app.use("/board*", async (req, res, next) => {
  try {
    mysqlDB = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.MY_SQL_PW,
      database: "blog",
    });
    next();
  } catch {
    console.log('sqldb 접속불가')
    next();
  }
});

// async () => {
//   try {
//     // let connection = await mysql.createConnection({
//     //   host: "localhost",
//     //   user: "root",
//     //   password: "1458369",
//     //   database: "blog",
//     // });
//     mysqlDB = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "1458369",
//       database: "blog",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// mysqlConn.connect();




//jwt 인증 라우터
const jwt = require(path.join(__dirname, './modules/jwt'));

//토큰 검증 middleware
app.use((req, res, next) => {
  try {
    const { AccessToken } = req.cookies;
    console.log('cookie = ' + req.cookies)
    console.log('JWT = ' + AccessToken)
    // console.log(AccessToken);
    const encodedHeader = AccessToken.split('.')[0];
    const encodedPayload = AccessToken.split('.')[1];
    const signature = AccessToken.split('.')[2];

    const tokenSignature = jwt.createSignature(encodedHeader, encodedPayload);

    if (signature != tokenSignature) throw new Error('poisoned cookie');

    //payload를 디코딩하여 req.user에 넣음
    //JSON => 자바스크립트 객체화
    const user = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));

    req.user = {
      ...user
    };
    next();

  } catch {
    next();
  }
});


app.get("/board/data", async (req, res) => {
  try {
    let [rows] = await mysqlDB.query("SELECT id, title, author, view, created from board");
    console.log('sql요청');
    res.send(rows);
  } catch (error) {
    console.error(error)
  }
});


app.post("/board/post", async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content)
  try {
    const sendQuery = `
    INSERT INTO board(title, content, created, author, view)
    VALUES('${title}', '${content}', NOW(), 'admin', 0)
    `;
    const result = await mysqlDB.query(sendQuery);
    res.send(result);
  } catch (error) {
    console.error(error);
  }

});

app.get('/userdata', (req, res) => {
  // const cookie = req.cookies
  // console.log('cookie = ', cookie)
  const userData = req.user;
  console.log("유저 데이터 요청", userData);
  res.send(userData);
});

app.get('/logout', (req, res)=>{
  // 쿠키 삭제
  res.clearCookie('AccessToken', {path: '/'})
  res.redirect('/')
})



//메인 blog 관련 라우터
app.use('/', require(path.join(__dirname, './routes/blog.js')));

//게시판 관련 라우터
app.use('/', require(path.join(__dirname, './routes/board.js')));

//게시판 관련 라우터
app.use('/', require(path.join(__dirname, './routes/acount.js')));






//admin 페이지
app.get('/:htmlFileName', async (req, res, next) => {
  try {
    const { htmlFileName } = req.params;
    const htmlFileFullDir = __dirname + '/public/' + htmlFileName + '.html';
    res.sendFile(htmlFileFullDir);
  } catch (err) {
    console.error(err);
  }

});











//404 Middleware
app.use((req, res, next) => { // 404 처리 부분
  console.log('404');
  res.status(404).send('일치하는 주소가 없습니다!');
});

//Error Middleware
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});


