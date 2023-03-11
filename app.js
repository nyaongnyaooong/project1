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

//MongoDB Atlas Setting
const dbURL = 'mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PW + process.env.DB_URL;
const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }

  db = result.db('project1');
  console.log('DB connected.');

  app.listen(8080, () => {
    console.log('listening on 8080');
  });

});




// const { Script } = require('vm');
// app.set('view engine', 'html');











// Main 블로그 Router
app.get('/blog', (req, res) => {
  // console.log('123');
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(__dirname + '/public/blog.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get('/blog/list', async (req, res) => {
  try {
    const result = await db.collection('blog').find({ view: true }).toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

app.get('/blog/add', async (req, res) => {
  res.sendFile(__dirname + '/public/blogAdd.html');

});

app.post('/blog/add/post', async (req, res) => {
  console.log('Create request');

  //counter collection에서 ID 찾기
  const getID = await db.collection('counter').findOne({ pw: '1234' });
  //counter collection ID 숫자증가
  const updateID = await db.collection('counter').updateOne({ pw: '1234' }, { $inc : { lastID: 1} });
  console.log(getID)

  const {title, content} = req.body;

  const dbObject = {
    _id: parseInt(getID.lastBlogID) + 1,
    date: new Date,
    title: title,
    content: content,
    view: true,
  }

  const addDB = await db.collection('blog').insertOne(dbObject);
  res.redirect('/blog/add');
});


app.get('/blog/:id', async (req, res) => {
  const result = await db.collection('blog').findOne({ _id: parseInt(req.params.id) });
  console.log(result)
  res.send(result);
});


//게시판
app.get('/board', (req, res) => {
  // console.log('123');
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(__dirname + '/public/board.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get('/board/list ', async (req, res) => {
  const result = await db.collection('board').find().toArray();
  res.send(result);
});



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

app.get('/login', (req, res) => {
  console.log('loginpage');

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


