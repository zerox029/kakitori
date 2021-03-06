const express = require("express");
const router = express.Router();

const kanjiController = require("../controllers/kanjiController");
const vocabController = require("../controllers/vocabController");
const userController = require("../controllers/userController");
const userScoreController = require("../controllers/userScoreController");

//Kanji routes
router.get('/kanji', kanjiController.getAllKanji);
router.get('/kanji/:kanji', kanjiController.getSingleKanji);
router.get('/kanji/id/:id', kanjiController.getSingleKanjiById);
router.get('/kanji/level/:level', kanjiController.getKanjiByLevel);
router.get('/kanji/level/cumulative/:level', kanjiController.getKanjiByLevelCumulative);

//Vocab routes
router.get('/vocab', vocabController.getAllVocab);
router.get('/vocab/:word', vocabController.getSingleVocab);
router.get('/vocab/level/:level', vocabController.getVocabByLevel);

//User routes
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', userController.addNewUser);

//User score routes
router.get('/user/score/all', userScoreController.getAllUserScores);
router.get('/user/score/:userId/:kanjiId', userScoreController.getUserScore);
router.put('/user/score/:userId/:kanjiId', userScoreController.updateUserScore);
router.post('/user/score/:userId/:kanjiId', userScoreController.addUserScore);
router.delete('/user/score/:userId/:kanjiId', userScoreController.deleteUserScore);

module.exports = router;