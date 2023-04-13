const router = require('express').Router({ mergeParams: true });
const path = require('path');

//MongoDB Atlas Setting
const dbURL = 'mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PW + process.env.DB_URL;
const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }
  db = result.db('project1');

});

let mysqlDB;

const mysql = require("mysql2/promise");
router.use("/blog*", async (req, res, next) => {
  console.log(1)
  try {
    mysqlDB = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.MY_SQL_PW,
      database: "blog",
    });
    console.log('blog sql접속')
    next();
  } catch {
    console.log('sqldb 접속불가');
    next();
  }
});





// Main 블로그 Router
router.get('/blog/title', async (req, res) => {
  try {
    console.log('SQL Request - 블로그 타이틀 리스트 요청');
    const readReqQuery = `
    SELECT title, pTitle
    FROM blogtitle
    `;
    const [response] = await mysqlDB.query(readReqQuery);
    res.send(response);
  } catch (error) {
    console.error(error)
  }
});



router.get('/blog/:id', async (req, res) => {
  const result = await db.collection('blog').findOne({ _id: parseInt(req.params.id) });
  console.log(result)
  res.send(result);
});

router.get('/blog/add', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/blog/blogAdd.html'));

});

router.post('/blog/add/post', async (req, res) => {
  console.log('Create request');

  //counter collection에서 ID 찾기
  const getID = await db.collection('counter').findOne({ pw: '1234' });
  //counter collection ID 숫자증가
  const updateID = await db.collection('counter').updateOne({ pw: '1234' }, { $inc: { lastID: 1 } });
  console.log(getID)

  const { title, content } = req.body;

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









module.exports = router;