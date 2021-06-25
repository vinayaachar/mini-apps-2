const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/client/dist'));



app.get('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
