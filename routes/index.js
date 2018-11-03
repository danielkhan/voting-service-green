const express = require('express');
const router = express.Router();

const VoteModel = require('../models/VoteModel');

module.exports = (zipkin) => {
  const redis = zipkin.redis();
  /* GET home page. */
  router.get('/', (req, res, next) => {
    try {
      if (req.query.choice) {
        const key = req.query.choice;
        redis.incr(key, (err, result) => {
          if(err) return next(err);
          redis.get('spaces', (err, spaces) => {
            if (err) return next(err);
            redis.get('tabs', (err, tabs) => {
              if (err) return next(err);
              return res.json({ spaces, tabs });
            });
          });
        });
      } else {
        redis.get('spaces', (err, spaces) => {
          if (err) return next(err);
          redis.get('tabs', (err, tabs) => {
            if (err) return next(err);
            return res.json({ spaces, tabs });
          });
        });
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
  return router;
}