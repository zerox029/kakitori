const Vocab = require("../models/vocab");

/**
 * Retrieves a complete list of vocab, filtered or not
 * @param {string} query.levels - The desired JLPT level of the returned vocab words as a comma-separated list  
 */
exports.getAllVocab = async (req, res, next) => {
  const levels = req.query.levels?.split(",");

  let vocab = [];
  if(levels)
  {
    vocab = await Vocab.find({ level: { $in: levels } });
  }
  else
  {
    vocab = await Vocab.find();
  }

  res.send(vocab);
}

/**
 * Retrieves information about a single vocab word
 * @param {string} params.word - The desired vocab word
 */
exports.getSingleVocab = async (req, res, next) => {
  const vocab = await Vocab.findOne({ word: req.params.word });

  res.send(vocab);
}