const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Api test route')
})

app.listen(4000, () => {
  console.log('listen port 4000');
})