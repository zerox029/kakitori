const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SentenceSchema = new Schema(
  {
    sentence: {type: String, required: true},
  }
)

module.exports = mongoose.model('Sentence', SentenceSchema, "sentences");