const path = require('path');
const friends = require('../data/friends.js');

module.exports = app => {

  app.get('/api/friends', (req, res) =>{
    res.json(friends);
  });

  app.post('/api/friends', (req, res) =>{
    let smDiff = Number.POSITIVE_INFINITY;
    let user = req.body;
    let bestMatch = undefined;

    friends.forEach(friend =>{
      let totalDiff = 0;

      friend.scores.forEach((answer, i)=>{
        totalDiff += Math.abs(parseInt(user.scores[i]) - answer);
      });

      if(smDiff > totalDiff){
        smDiff = totalDiff;
        bestMatch = friend;
      }
    });

    friends.push(user);
    res.send(bestMatch);
  });

};