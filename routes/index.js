const express = require('express');
const router = express.Router();

const VoteModel = require('../models/VoteModel');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.query.choice) {
    const newVote = new VoteModel({ choice: req.query.choice });
    await newVote.save();
  }

  const spaces = await VoteModel.count({ choice: 'spaces' }).exec();
  const tabs = await VoteModel.count({ choice: 'tabs' }).exec();

  return res.json({ spaces, tabs });
});

module.exports = router;
