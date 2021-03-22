const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  console.log('root path');
  res.send('Hello World')
})
 
app.listen(3000)