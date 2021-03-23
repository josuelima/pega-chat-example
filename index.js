const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
 
app.get('/', function (req, res) {
  res.render('index')
})

app.post('/private-data', function (req, res) {
  // Securely send private data to Chat session
  // Any JSON payload can be sent
  const privateData = { authenticated: true }
  const token = jwt.sign({ iss: req.body.sessionId }, process.env.JWT_SECRET);

  fetch('https://widget.use1dev.chat.pega.digital/private-data', {
    method: 'POST',
    body: JSON.stringify(privateData),
    headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' +  token},
  });

  res.sendStatus(200)
});
 
app.listen(PORT)