const User = require("../models/user");

///TODO: Add error handling

exports.getAllUsers = async (req, res) => {
    const users = await User.find();

    res.send(users);
}

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.send(user);
}