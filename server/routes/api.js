const express = require("express");
const router = express.Router();

const kanjiController = require("../controllers/kanjiController");

router.get('/kanji', kanjiController.getAllKanji);
router.get('/kanji/level/:level', kanjiController.getKanjiByLevel);
router.get('/kanji/:kanji', kanjiController.getSingleKanji);

module.exports = router;