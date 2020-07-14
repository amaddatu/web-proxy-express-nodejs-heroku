const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
// const url = require('url');
const https = require('https');
// const querystring = require('querystring');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

app.get('/proxy/api/v1', cors(), (req, res) => {
  // console.log(req.query.target);
  https.get(req.query.target, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // console.log(data);
      return res.send(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
    return res.send("Error: " + err.message);
  }).end();
  // res.send("hello");
});

// // post proxy may be implemented later...

// app.post('/proxy/api/v1', cors(), (req, res) => {
//   console.log(req.query.target);
//   var user_id = req.body.id;
//   var token = req.body.token;
//   var geo = req.body.geo;

//   res.send(user_id + ' ' + token + ' ' + geo);
//   https.get(req.query.target, (resp) => {
//     let data = '';

//     // A chunk of data has been recieved.
//     resp.on('data', (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//       console.log(data);
//       return res.send(data);
//     });

//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//     return res.send("Error: " + err.message);
//   }).end();
//   // res.send("hello");
// });

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
