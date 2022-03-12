const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KanjiSchema = new Schema(
  {
    kanji: {type: String, required: true},
    level: {type: Number, required: true}
  }
)

module.exports = mongoose.model('Kanji', KanjiSchema, "kanji");