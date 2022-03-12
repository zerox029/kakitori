const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VocabSchema = new Schema(
  {
    word: {type: String, required: true},
    reading: {type: String, required: true},
    translation: {type: String, required: true},
    level: {type: Number, required: true}
  }
)

module.exports = mongoose.model('Vocab', VocabSchema);