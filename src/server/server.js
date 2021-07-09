const cors = require('cors');
const express = require('express');
const app = express();
const path = require("path")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

// app.get('/api/vcs/prs', (req, res) => {
//   res.redirect('https://api.github.com/repos/nodejs/node/pulls?state=all');
// });


app.listen(3000, () => {
  console.log('Listening on 3000...');
});