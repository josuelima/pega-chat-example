const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const axios = require('axios')

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
  const body = {
    customerId: 'currently_logged_user_id'
  }

  const response = await axios.post(`https://widget.sandbox.chat.pega.digital/${process.env.WIDGET_ID}/create`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      }
    },
  );

  res.send(response.sessionId);
});

app.listen(PORT)