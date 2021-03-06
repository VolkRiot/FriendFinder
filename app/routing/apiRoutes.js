module.exports = (app, path) => {
  const friends = require('../data/friends.js');

  app.get('/api/friends', (req, res) => {
    res.json(friends);
  });

  app.post('/api/friends', (req, res) => {
    let smDiff = Number.POSITIVE_INFINITY;
    let user = {};

    user.name = req.body.name;
    user.photo = req.body.photo;
    user.scores = req.body.scores.map((item) => {
      return parseInt(item);
    });

    let bestMatch;

    friends.forEach(friend => {
      let totalDiff = 0;

      friend.scores.forEach((answer, i) => {
        totalDiff += Math.abs(user.scores[i] - answer);
      });

      if (smDiff > totalDiff) {
        smDiff = totalDiff;
        bestMatch = friend;
      }
    });

    friends.push(user);
    res.send(bestMatch);
  });
};
