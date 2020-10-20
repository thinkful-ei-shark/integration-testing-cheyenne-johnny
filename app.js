const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const playStore = require('./playstore');

app.get('/apps', (req, res) => {
  const {sort, genre} = req.query;
  let returnData = [...playStore];

  if(genre && genre !== 'action' && genre !== 'puzzle' && genre !== 'strategy' && genre !== 'casual' && genre !== 'arcade' && genre !== 'card') {
    res
      .status(400)
      .send('Genre must be one of the following : action, puzzle, strategy, casual, arcade, card');
  }

  // sort validation
  if(sort && sort !== 'rating' && sort !== 'app') {
    res
      .status(400)
      .send('Sort must be one of rating or app');
  }

  // genre filtering
  if(genre) {
    returnData = returnData.filter(a => {
      return a.Genres.toLowerCase().includes(genre.toLowerCase());
    });
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

  res.json(returnData);
});

app.listen(8080, () => console.log('server started'));