const ObjectId = require("mongoose").Types.ObjectId;
const UserScore = require("../models/userScore");

exports.getAllUserScores = async (req, res, next) => {
    const userScores = await UserScore.find({});

    res.send(userScores);
}

exports.getUserScore = async (req, res, next) => {
    const score = await UserScore.findOne({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    });

    res.send(score);
}

exports.updateUserScore = async (req, res, next) => {
    const filter = {
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    };
    const increment = {
        correctCount: req.body.correctCount || 0,
        incorrectCount: req.body.incorrectCount || 0
    }
    
    await UserScore.findOneAndUpdate(filter, { $inc: increment }, { upsert: true });

    res.send("Updated the database");
}

exports.addUserScore = async (req, res, next) => {
    const score = new UserScore({ 
        userId: req.params.userId,
        kanjiId: req.params.kanjiId,
        correctCount: req.body.correctCount || 0,
        incorrectCount: req.body.incorrectCount || 0
    })
    score.save();

    res.send("Inserted in the database");
}

exports.deleteUserScore = async (req, res, next) => {
    await UserScore.deleteOne({
        userId: new ObjectId(req.params.userId), 
        kanjiId: new ObjectId(req.params.kanjiId) 
    });

    res.send("Deleted the score");
}