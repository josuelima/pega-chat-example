const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (_, res) {
  res.render('index')
})

app.get('/create-chat-session', async function (_, res) {
  /**
   * Securely request a new chat session
   */
  const token = jwt.sign({ iss: process.env.WIDGET_ID }, process.env.JWT_SECRET);

  const response = await fetch(`https://widget.sandbox.chat.pega.digital/${process.env.WIDGET_ID}/create`, {
    method: 'POST',
    body: JSON.stringify({ customerId: 'currently_logged_user_id' }),
    headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token },
  });

  const data = await response.json();
  res.send(data.sessionId);
});

app.listen(PORT)