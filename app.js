//express
const express = require('express');
const app = express();

//path, fs
const path = require('path');
const fs = require('fs');

//express 모듈에 body-parser내장
app.use(express.urlencoded({ extended : true }));

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
app.use(cors());  // 모든 도메인에 대해 제한 없음

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
  // perform actions on the collection object
  // client.close();
});
// MongoClient.connect(dbURL, (err, result) => {
//   if (err) {
//     return console.log(err);
//   }

//   db = result.db('project1');

//   app.listen(8080, () => {
//     console.log('listening on 8080');
//   });

// });

const jwt = require(path.join(__dirname, './modules/jwt'));



// const { Script } = require('vm');
// app.set('view engine', 'html');


//토큰 검증 middleware
app.use((req, res, next) => {
  try {
    const { AccessToken } = req.cookies;
    console.log(AccessToken);
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

app.get('/userdata', (req, res) => {
  const userData = req.user;
  console.log("유저 데이터 요청", userData);
  res.send(userData);
});


//메인 blog 관련 라우터
app.use('/', require(path.join(__dirname, './routes/blog.js')));

//게시판 관련 라우터
app.use('/', require(path.join(__dirname, './routes/board.js')));

//게시판 관련 라우터
app.use('/', require(path.join(__dirname, './routes/acount.js')));






//admin 페이지
app.get('/:htmlFileName', async(req, res, next) => {
  try {
    const { htmlFileName } = req.params;
    const htmlFileFullDir = __dirname + '/public/' + htmlFileName + '.html';
    console.log(htmlFileName);
    res.sendFile(htmlFileFullDir);
  } catch (err) {
    console.log(1);
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


