const ObjectId = require("mongoose").Types.ObjectId;
const UserScore = require("../models/userScore");

///TODO: Add error handling

exports.getAllUserScores = async (req, res) => {
    const userScores = await UserScore.find({});

    res.send(userScores);
}

exports.getUserScore = async (req, res) => {
    const score = await UserScore.findOne({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    });

    res.send(score);
}

exports.updateUserScore = async (req, res) => {
    const score = await UserScore.findOne({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    });

    score.correctCount += req.body.correctCount || 0;
    score.incorrectCount += req.body.incorrectCount || 0;

    score.save();

    res.send("Updated the database");
}

exports.addUserScore = async (req, res) => {
    const score = new UserScore({ 
        userId: req.params.userId,
        kanjiId: req.params.kanjiId,
        correctCount: req.body.correctCount || 0,
        incorrectCount: req.body.incorrectCount || 0
    })
    score.save();

    res.send("Inserted in the database");
}

exports.deleteUserScore = async (req, res) => {
    await UserScore.deleteOne({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    });

    res.send("Deleted the score");
}