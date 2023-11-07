var mongoose = require('mongoose')
var User = mongoose.model('User');
// const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


// @desc registration for a user
// @route POST /api/users
// @access Public
// @required fields {email, username, password}
// @return User
async function registerUser (req, res) {
    const { user } = req.body;

    if (!user||!user.username ||!user.email||!user.password ) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    // hash password
    const hashedPwd = await bcrypt.hash(user.password, 10); // salt rounds
    // res.json("realizado");

    const userObject = {
      username: user.username,
      password: hashedPwd,
      email: user.email,
    };
  
    try {
      const createdUser = await User.create(userObject);
  
      if (createdUser) { // user object created successfully
        res.status(201).json({
          message:createdUser,
        });
      } else {
        res.status(422).json({
          errors: {
            body: "Unable to register a user",
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

// @desc get currently logged-in user
// @route GET /api/user
// @access Private
// @return User
async function getCurrentUser  (req, res) {
    // After authentication; email and hashsed password was stored in req
    const email = req.userEmail;

    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(404).json({message: "User Not Found"});
    }

    res.status(200).json({
        user: user.toUserResponse()
    })

};

// @desc login for a user
// @route POST /api/users/login
// @access Public
// @required fields {email, password}
// @return User
async function userLogin  (req, res) {
    const { user } = req.body;
   
    // confirm data
    if (!user || !user.email || !user.password) {
        return res.status(400).json({message: "All fields are required"});
    }
    const loginUser = await User.findOne({ email: user.email }).exec();
    
    console.log("loginUser",user.password);

    if (!loginUser) {
        return res.status(404).json({message: "User Not Found"});
    }

    const match = await bcrypt.compare(user.password, loginUser.password);
   
    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' })
    
    res.status(200).json({
        user: loginUser.toUserResponse()
    });
};
// @desc update currently logged-in user
// Warning: if password or email is updated, client-side must update the token
// @route PUT /api/user
// @access Private
// @return User
async function updateUser  (req, res)  {
    const { user } = req.body;
    // console.log("user update backen",user);
    // confirm data
    if (!user) {
        return res.status(400).json({message: "Required a User object"});
    }

    const email = req.userEmail;

    const target = await User.findOne({ email }).exec();

    if (user.email) {
        target.email = user.email;
    }
    if (user.username) {
        target.username = user.username;
    }
    if (user.password) {
        const hashedPwd = await bcrypt.hash(user.password, 10);
        target.password = hashedPwd;
    }
    if (typeof user.image !== 'undefined') {
        target.image = user.image;
    }
    if (typeof user.bio !== 'undefined') {
        target.bio = user.bio;
    }
    await target.save();
    // console.log("target update", target);
    return res.status(200).json({
        user: target.toUserResponse()
    });

};

const  user = {
    registerUser:registerUser,
    getCurrentUser:getCurrentUser,
    userLogin:userLogin,
    updateUser:updateUser
}
module.exports = user