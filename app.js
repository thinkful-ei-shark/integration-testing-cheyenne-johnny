const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const playStore = require('./playstore');

app.get('/apps', (req, res) => {
  const {sort} = req.query;
  const returnData = [...playStore];

  // sort validation
  if(sort && sort !== 'rating' && sort !== 'app') {
    res
      .status(400)
      .send('Sort must be one of rating or app');
  }
  // sort by rating or app
  if(sort) {
    let newSort;

    if(sort === 'rating'){
      newSort = 'Rating';
    } else {
      newSort = 'App';
    }
    
    returnData.sort((currApp, nextApp) => {
      console.log('currApp rating', currApp[newSort]);
      if(currApp[newSort] > nextApp[newSort]) return 1;
      if(currApp[newSort] < nextApp[newSort]) return -1;
      return;
    });
  }
  if(sort === 'app')

  res.json(returnData);
});

app.listen(8080, () => console.log('server started'));