const express = require("express");
const router = express.Router();

const kanjiController = require("../controllers/kanjiController");
const vocabController = require("../controllers/vocabController");

//Kanji routes
router.get('/kanji', kanjiController.getAllKanji);
router.get('/kanji/:kanji', kanjiController.getSingleKanji);
router.get('/kanji/level/:level', kanjiController.getKanjiByLevel);

//Vocab routes
router.get('/vocab', vocabController.getAllVocab);
router.get('/vocab/:word', vocabController.getSingleVocab);
router.get('/vocab/level/:level', vocabController.getVocabByLevel);

module.exports = router;