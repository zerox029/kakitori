const Kanji = require("../models/kanji");

/**
 * Retrieves a complete list of kanji, filtered or not
 * @param {string} query.levels - The desired kanken level of the returned kanji as a comma-separated list  
 */
exports.getAllKanji = async (req, res, next) => {
  const levels = req.query.levels?.split(",");

  let kanji = [];
  if(levels)
  {
    kanji = await Kanji.find({ level: { $in: levels } });
  }
  else
  {
    kanji = await Kanji.find();
  }
  
  res.send(kanji);
}

/**
 * Retrieves information about a specific kanji
 * @param {string} params.kanji - The kanji itself
 */
exports.getSingleKanji = async (req, res, next) => {
  const kanji = await Kanji.findOne({ kanji: req.params.kanji });

  res.send(kanji);
}

/**
 * Retrieves information about a specific kanji given its id
 * @param {string} params.kanji - The id of the kanji to lookup
 */
exports.getSingleKanjiById = async (req, res, next) => {
  const kanji = await Kanji.findById(req.params.id);

  res.send(kanji);
}