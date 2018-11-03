const express = require('express');
const router = express.Router();

const VoteModel = require('../models/VoteModel');

module.exports = (zipkin) => {
  const redis = zipkin.redis();
  /* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    if (req.query.choice) {
      const key = req.query.choice;
      const votes = await redis.incr(key);
      // const newVote = new VoteModel({ choice: req.query.choice });
      // const saveRes = await newVote.save();
    }

    // const spaces = await VoteModel.count({ choice: 'spaces' }).exec();
    // const tabs = await VoteModel.count({ choice: 'tabs' }).exec();

    const spaces = await redis.get('spaces');
    const tabs = await redis.get('spaces');

    return res.json({ spaces, tabs });
  } catch(err) {
    console.log(err);
    return next(err);
  }
});
  return router;
}