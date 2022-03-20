const Kanji = require("../models/kanji");

exports.getAllKanji = async (req, res, next) => {
  const kanji = await Kanji.find();

  res.send(kanji);
}

exports.getKanjiByLevel = async (req, res, next) => {
  const kanji = await Kanji.find({ level: req.params.level });

  res.send(kanji);
}

exports.getSingleKanji = async (req, res, next) => {
  const kanji = await Kanji.findOne({ kanji: req.params.kanji });

  res.send(kanji);
}

exports.getSingleKanjiById = async (req, res, next) => {
  const kanji = await Kanji.findById(req.params.id);

  res.send(kanji);
}