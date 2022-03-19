const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.send(users);
}

exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.send(user);
}

exports.addNewUser = async (req, res, next) => {
    const user = new UserScore({ 
        username: req.body.username,
    })

    user.save();
    
    res.send("Inserted in the database");
}