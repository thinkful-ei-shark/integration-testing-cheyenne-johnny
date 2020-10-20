const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const playStore = require('./playstore');

app.get('/apps', (req, res) => {
  const returnData = [...playStore];

  res.json(returnData);
});

app.listen(8080, () => console.log('server started'));