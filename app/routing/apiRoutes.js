const path = require('path');
const friends = require('../data/friends.js');

module.exports = (app) => {

  app.get('/api/friends', (req, res) =>{
    res.json(friends);
  });

  app.post('/api/friends', (req, res) =>{
    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to
    // handle the compatibility logic.
  });

};