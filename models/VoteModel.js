const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  choice: { type: String },
});

mongoose.export = mongoose.model('Vote', VoteSchema);