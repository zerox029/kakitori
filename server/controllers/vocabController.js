const Vocab = require("../models/vocab");

exports.getAllVocab = async (req, res, next) => {
  const vocab = await Vocab.find();

  res.send(vocab);
}

exports.getSingleVocab = async (req, res, next) => {
  const vocab = await Vocab.find({ word: req.params.word });

  res.send(vocab);
}

exports.getVocabByLevel = async (req, res, next) => {
  const vocab = await Vocab.find({ level: req.params.level });

  res.send(vocab);
}