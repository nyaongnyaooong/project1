const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//express 모듈에 body-parser내장
//const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended : true }));

// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));


//const { Script } = require('vm');
app.set('view engine', 'html');
 
const mainHTML = fs.readFileSync(__dirname + "/html/main.ejs", "utf8");


app.use(express.static("public"));


// Main Router
app.get('/main', (req, res) => {
  // console.log("123");
  // const filePath = path.join(__dirname, 'html', 'main.ejs')
  res.sendFile(__dirname + '/public/main.html');
  // res.sendFile(__dirname + '/index.html');
});


app.listen(8080, () => {
  console.log("listening on 8080")
});