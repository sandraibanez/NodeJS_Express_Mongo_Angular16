const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followersUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

// @desc generate access token for a user
// @required valid email and password
userSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1Y"}
    );
    return accessToken;
}

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateAccessToken()
    }
};

userSchema.methods.toProfileJSON = function (user) {
    // console.log("user user",user);
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false,
        favorites: this.favorites,
        followersUsers: this.followersUsers,
        followingUsers: this.followingUsers
    }
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.follow = function (id) {
    if(this.followingUsers.indexOf(id) === -1){
        this.followingUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if(this.followingUsers.indexOf(id) !== -1){
        this.followingUsers.remove(id);
    }
    return this.save();
};

userSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const product of this.favorites) {
        if (product.toString() === idStr) {
            return true;
        }
    }
    return false;
}

userSchema.methods.favorite = function (id) {
    if(this.favorites.indexOf(id) === -1){
        this.favorites.push(id);
    }
    return this.save();
}

userSchema.methods.unfavorite = function (id) {
    if(this.favorites.indexOf(id) !== -1){
        this.favorites.remove(id);
    }
    return this.save();
};
userSchema.methods.isFollower = function (id) {
    const idStr = id.toString();
    for (const user of this.followersUsers) {
        if (user.toString() === idStr) {
            return true;
        }
    }
    return false;
}
userSchema.methods.follower  = function (id) {
    if(this.followersUsers.indexOf(id) === -1){
        this.followersUsers.push(id);
    }
    return this.save();
}
userSchema.methods.unfollower = function (id) {
    if(this.followersUsers.indexOf(id) !== -1){
        this.followersUsers.remove(id);
    }
    return this.save();
};
userSchema.methods.toProfileCommentJSON = function () {
    return {
      username: this.username,
      image: this.image || 'https://avatars.dicebear.com/api/personas/' + this.username + '.svg',
    };
  }
module.exports = mongoose.model('User', userSchema);
