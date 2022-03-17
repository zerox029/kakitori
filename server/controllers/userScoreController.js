const ObjectId = require("mongoose").Types.ObjectId;
const UserScore = require("../models/userScore");

///TODO: Add error handling

exports.getAllUserScores = async (req, res) => {
    const userScores = await UserScore.find({});
    
    res.send(userScores);
}

exports.getUserScoreForKanji = async (req, res) => {
    const score = await UserScore.find({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.wordId) 
    });

    res.send(score);
}

exports.updateUserScoreForKanji = async (req, res) => {
    res.send("NOT IMPLEMENTED");
}

exports.addUserScoreForKanji = async (req, res) => {
    console.log(req.body);
}