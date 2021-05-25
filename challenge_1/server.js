const express = require('express');
const app = express();
const path = require('path');
//const dbSave = require('./databse/index.js')
var cors = require('cors');


const port = 3000;

var bodyParser = require('body-parser')

//app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/client/dist')
app.use(express.static(__dirname + '/client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './public')});
})


app.listen(port, () => {
  console.log(`Checkout app listening at http://localhost:${port}`);
})