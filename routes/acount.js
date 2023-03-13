const express = require('express');
const router = require('express').Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const salt = 'test';


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


});

const jwt = require(path.join(__dirname, '../modules/jwt'));










router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/acount/login.html'));
});

router.post('/login/post', async (req, res) => {
  const {id, pw} = req.body;
  const result = await db.collection('user').findOne({ name: id });

  try {
    if (!result) {
      throw new Error('일치하는 아이디가 존재하지 않음');
    } else if (result.pw != pw) {
      throw new Error('비밀번호 틀림');

    }
    const payload = {
        userid: result.name,
    }
    //JWT 생성
    const token = jwt.createToken(payload);
    
    // 생성한 토큰을 쿠키로 만들어서 브라우저에게 전달
    res.cookie('AccessToken', token, {
        path: '/',
        HttpOnly: true
    });
    res.redirect('/');
      
  } catch(err) {
      console.log(err)
      res.send('로그인 실패')
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/acount/register.html'));
});

router.post('/register/post', async (req, res) => {
  try {
    const duplication = await db.collection('user').findOne({ name: req.body.id });
    if(duplication) {
      throw new Error('중복');
    }
    const counter = await db.collection('counter').findOne({ pw: '1234' });
    parseInt(counter.LastUserID)
    const dbObject = {
      _id: parseInt(counter.LastUserID) + 1,
      name: req.body.id,
      pw: req.body.pw,
    }
    const result = await db.collection('user').insertOne(dbObject);
  
    res.redirect('/blog');
  } catch(err) {
    console.error(err);
  }

});







module.exports = router;