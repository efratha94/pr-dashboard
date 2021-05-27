const cors = require('cors');
const express = require('express');
const app = express();
const path = require("path")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(path.resolve(),'client')));
app.use(express.static(path.join(path.resolve(),'node_modules')));

// console.log(path.join(path.resolve(),'client'))

// app.get('/api/vcs/prs', (req, res) => {
//   res.redirect('https://api.github.com/repos/nodejs/node/pulls?state=all');
// });


app.listen(3000, () => {
  console.log('Listening on 3000...');
});