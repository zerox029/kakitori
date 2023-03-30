const { query } = require("express");
const Sentences = require("../models/sentence");

/**
 * Retrieves a complete list of sentences, filtered or not
 * @param {string} query.word - If this is fullfilled, the returned sentences will all contain the given word
 */
exports.getAllSentences = async (req, res, next) => {
  let sentences = [];
  if(query.word)
  {
    sentence = await Sentences.find({ "sentence": { "$regex": req.query.word } });
  }
  else
  {
    sentences = await Sentences.find();
  }

  res.send(sentence);
}

/**
 * Retrieves information about a specific sentence given its id
 * @param {string} params.kanji - The id of the sentence to lookup
 */
exports.getSentenceById = async (req, res, next) => {
  const sentence = await Sentences.findById(req.params.id);

  res.send(sentence);
}