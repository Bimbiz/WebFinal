const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    res.json(req.user);
};

exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.json(updatedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};