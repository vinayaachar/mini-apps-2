const express = require('express');
const app = express();
const path = require('path');
//const dbSave = require('./databse/index.js')
var cors = require('cors');

const data = require('./data/db.json');


const port = 4000;

var lastCount = 0;

var bodyParser = require('body-parser')

//app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/client/dist')
app.use(express.static(__dirname + '/client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/api', (req, res) => {
  var queryString = req.query.search;
  var jsonData = data.events;
  var sendData = [];
  var initial = Number(req.query.initial);
  var pageCount = Number(req.query.pageCount);
  for (var i = pageCount; i < jsonData.length; i++) {
    if (sendData.length === 10) {
      lastCount = i;
      break;
    }

    if (jsonData[i].category2 !== undefined) {
      if (jsonData[i].category2.includes(queryString)) {
        sendData.push(jsonData[i]);
      }
    }else if (jsonData[i].description.includes(queryString)) {
      sendData.push(jsonData[i]);
    }
  }

  var obj = {
    data: sendData,
    count: lastCount
  }
  res.status(200).json(obj);
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './public')});
})


app.listen(port, () => {
  console.log(`Events listening at http://localhost:${port}`);
})