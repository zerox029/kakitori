const ObjectId = require("mongoose").Types.ObjectId;
const UserScore = require("../models/userScore");

///TODO: Add error handling

exports.getUserScoreForWord = async (req, res) => {
    const score = await UserScore.find({
        userId: new ObjectId(req.params.userId), 
        wordId: new ObjectId(req.params.wordId) 
    });

    res.send(score);
}

exports.updateUserScoreForWord = async (req, res) => {
    res.send("NOT IMPLEMENTED");
}

exports.addUserScoreForWord = async (req, res) => {
    res.send("NOT IMPLEMENTED");
}