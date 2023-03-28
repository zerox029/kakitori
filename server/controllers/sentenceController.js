const Sentences = require("../models/sentence");

exports.getAllSentences = async (req, res, next) => {
  const sentence = await Sentences.find({ "sentence": { "$regex": req.query.word } })

  res.send(sentence);
}

exports.getSentenceById = async (req, res, next) => {
  const sentence = await Sentences.findById(req.params.id);

  res.send(sentence);
}