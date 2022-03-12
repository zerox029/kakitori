const Kanji = require("../models/kanji");

///TODO: Add error handling

exports.getAllKanji = async (req, res) => {
  const kanji = await Kanji.find();

  res.send(kanji);
}

exports.getKanjiByLevel = async (req, res) => {
  const kanji = await Kanji.find({ level: req.params.level });

  res.send(kanji);
}

exports.getSingleKanji = async (req, res) => {
  const kanji = await Kanji.find({ kanji: req.params.kanji });

  res.send(kanji);
}