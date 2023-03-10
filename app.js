const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

//express 모듈에 body-parser내장
app.use(express.urlencoded({ extended : true }));

//method-override for RESTFUL API
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//dotenv
require('dotenv').config()

// const { Script } = require('vm');
// app.set('view engine', 'html');
 
//Static File
app.use(express.static("public"));

//MongoDB Atlas Setting
const dbURL = "mongodb+srv://" + process.env.DB_ID + ":" + process.env.DB_PW + process.env.DB_URL;
const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }

  db = result.db("project1");
  console.log('DB connected.');

  app.listen(8080, () => {
    console.log("listening on 8080");
  });

});















// Main 블로그 Router
app.get('/main', (req, res) => {
  // console.log("123");
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(__dirname + '/public/main.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get("/main/blog/list", async (req, res) => {
  try {
    const result = await db.collection("blog").find().toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

app.post("main/blog/add", async (req, res) => {
  const { title, content } = req.body;

  const result = await db.collection("blog").find().toArray();
});


//게시판
app.get('/board', (req, res) => {
  // console.log("123");
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(__dirname + '/public/board.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get('/board/index', async (req, res) => {
  const result = await db.collection("board").find().toArray();
  res.send(result);
});



//admin 페이지
app.get("/:htmlFileName", async(req, res, next) => {
  try {
    const { htmlFileName } = req.params;
    const htmlFileFullDir = __dirname + "/public/" + htmlFileName + ".html";
    console.log(htmlFileName);
    res.sendFile(htmlFileFullDir);
  } catch (err) {
    console.log(1);
    console.error(err);
  }
  
});

app.get("/login", (req, res) => {
  console.log("loginpage");

});








//404 Middleware
app.use((req, res, next) => { // 404 처리 부분
  console.log("404");
  res.status(404).send('일치하는 주소가 없습니다!');
});

//Error Middleware
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});


