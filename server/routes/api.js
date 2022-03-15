const express = require("express");
const router = express.Router();

const kanjiController = require("../controllers/kanjiController");
const vocabController = require("../controllers/vocabController");
const userController = require("../controllers/userController");
const userScoreController = require("../controllers/userScoreController");

//Kanji routes
router.get('/kanji', kanjiController.getAllKanji);
router.get('/kanji/:kanji', kanjiController.getSingleKanji);
router.get('/kanji/level/:level', kanjiController.getKanjiByLevel);

//Vocab routes
router.get('/vocab', vocabController.getAllVocab);
router.get('/vocab/:word', vocabController.getSingleVocab);
router.get('/vocab/level/:level', vocabController.getVocabByLevel);

//User routes
router.get('/user/:id', userController.getUser);

//User score routes
router.get('/user/score/:userId/:wordId', userScoreController.getUserScoreForWord);
router.put('/user/score/:userId/:wordId', userScoreController.updateUserScoreForWord);
router.post('/user/score/:userId/:wordId', userScoreController.addUserScoreForWord);

module.exports = router;