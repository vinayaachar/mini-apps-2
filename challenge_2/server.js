const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');
const axios = require('axios');



const port = 3000;

var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//route
var currencies = ['USD', 'GBP', 'EUR'];
var usdRates = [];
var euRates = [];
var gbpRates = [];
var obj = {};
var dates = [];

app.use('/api', (req, res) => {
  getData()
    .then(() => {
      obj = {
        usdRates: usdRates,
        dates: dates
      }
      res.status(200).json(obj);
    })
})

const loop = async () => {
  for (var i = 0; i < 10 ; i++) {
   await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      // rates.push(response.data.bpi.USD.rate, response.data.bpi.GBP.rate, response.data.bpi.EUR.rate);
      usdRates.push(response.data.bpi.USD.rate_float);
      euRates.push(response.data.bpi.EUR.rate_float);
      gbpRates.push(response.data.bpi.GBP.rate_float);
    })
    .catch(err => console.log(err));
  }
}

const getData = async () => {
  await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-05-05&end=2021-05-15')
    .then(response => {
      var data = response.data.bpi
      for (var keys in data) {
        dates.push(keys);
        usdRates.push(data[keys]);
      }
    })
    .catch(err => console.log(err));
}

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './public')});
})


app.listen(port, () => {
  console.log(`Mini Apps 2 Challenge 2 listening at http://localhost:${port}`);
})