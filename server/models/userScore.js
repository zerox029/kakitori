const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserScoreSchema = new Schema(
  {
    userId: {type: mongoose.ObjectId, required: true},
    wordId: {type: mongoose.ObjectId, required: true},
    correctCount: {type: Number, required: true, default: 0},
    incorrectCount: {type: Number, required: true, default: 0}
  }
)

module.exports = mongoose.model('UserScore', UserScoreSchema, "userScore");