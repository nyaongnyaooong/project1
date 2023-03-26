const router = require('express').Router();
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


router.get('/board', (req, res) => {
  console.log('requser', req.user);
  // console.log('123');
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(path.join(__dirname, '../public/html/board/board.html'));
  // res.sendFile(__dirname + '/index.html');
});

router.get('/board/list', async (req, res) => {
  const result = await db.collection('board').find().toArray();
  res.send(result);
});

router.get('/board/:id', async (req, res) => {
  const result = await db.collection('board').findOne({ _id: parseInt(req.params.id) });
  console.log(result)
  res.send(result);
});





module.exports = router;
