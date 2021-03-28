const express = require('express');
const app = express();

/* GET home page. */
app.get('/data',(req,res)=>{
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent to the API
  // (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('data_test.json','utf-8',function read(err, data){
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

app.get('/regions', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('WholeCountry.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

app.get('/citypoint', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('CityPoint.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

app.get('/city_month', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('city_month.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

app.get('/city_day', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('city_day.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

app.get('/word_cloud', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const fs = require('fs');

  fs.readFile('word_cloud_data.json', 'utf8', function read(err, data) {
    if (err) {
      throw err;
    }

    let ret = JSON.parse(data);
    res.send(ret);
  });
});

const server = app.listen(3001, '127.0.0.1', function () {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
