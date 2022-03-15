const User = require("../models/user");

///TODO: Add error handling

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.send(user);
}