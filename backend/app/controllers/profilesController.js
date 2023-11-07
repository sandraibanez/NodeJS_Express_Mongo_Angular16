// const User = require("../models/user.model.js");
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const getProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const loggedin = req.loggedin;

    // console.log(`print out username ${username}`)
    const user = await User.findOne({ username }).exec();

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    if (!loggedin) {
        // return res.status(200).json({
        //     profile: user.toProfileJSON(false)
        // });
        res.json(await user.toProfileJSON(false));
    } else {
        const loginUser = await User.findOne({ email: req.userEmail }).exec();
        res.json(await user.toProfileJSON(loginUser));
        // return res.status(200).json({
        //     profile: user.toProfileJSON(loginUser)
            
        // })
    }

});

const followUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const loginUser = await User.findOne({ email: req.userEmail }).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    await loginUser.follow(user._id);
    await loginUser.follower(user._id);
    console.log(await loginUser.follower(user._id));
    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

const unFollowUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const loginUser = await User.findOne({ email: req.userEmail }).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    await loginUser.unfollow(user._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

const get_followers = async (req, res) => {
    try {
        const id = req.userId; // ID del usuario actual
        const loginUser = await User.findById(id).exec();

        if (!loginUser) {
            return res.status(401).json({
                message: "Usuario no encontrado"
            });
        }

            // Busca los usuarios que son seguidores
            const followers = await User.find({ followersUsers: id }).exec();

            // Transforma los datos de los seguidores según el método toProfileJSON
            // const followersData = followers.map(follower => follower.toProfileJSON(loginUser));
            // console.log(followersData);
            return res.json(followers.map(follower => follower.toProfileJSON(loginUser)));
       
    } catch (error) {
        res.status(500).json({ msg: "Ha ocurrido un error" });
    }
};
module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    get_followers
}
