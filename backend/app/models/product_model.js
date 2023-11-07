const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user.model');
const product_schema = new mongoose.Schema({
    slug: { 
        type: String, 
        lowercase: true, 
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id_category: {
        type: String,
        required: true
    },
    name_cat: {
        type: String,
        requiered: true
    },
    state: {
        type: String,
        requiered: true
    },
    location: String,
    product_images: [String],
    favorites: Number,
    // favorited: {
    //     type: Boolean,
    //     default: false,
    // },
    favoritesCount: {
        type: Number,
        default: 0
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

product_schema.plugin(uniqueValidator, { msg: "already taken" });

product_schema.pre('save', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});//pre

product_schema.methods.slugify = function () {
    if (!this.slug){
        this.slug = slugify(this.name, { lower: true, replacement: '-'});
        }
};//slugify

product_schema.methods.updateFavoriteCount = async function () {
    const favoriteCount = await User.count({
        favorites: {$in: [this._id]}
    });
    this.favoritesCount = favoriteCount;
    return this.save();
}

product_schema.methods.toProductCarouselResponse = function(){
    return {
        slug: this.slug,
        product_images: this.product_images,
        name: this.name
    };
}
product_schema.methods.toproductresponse = async function(user){
    const authorObj = await User.findById(this.author).exec();
    // console.log("authorObj",authorObj);
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_category: this.id_category,
        name_cat: this.name_cat,
        state: this.state,
        location: this.location,
        author: this.author,
        product_images: this.product_images,
        favorites: this.favorites || 0,
        favorited: user ? user.isFavourite(this.id) : false,
        favoritesCount: this.favoritesCount,
        author:  authorObj.toProfileJSON(user)
    };
};
product_schema.methods.addComment = function (commentId) {
    if(this.comments.indexOf(commentId) === -1){
        this.comments.push(commentId);
    }
    return this.save();
};

product_schema.methods.removeComment = function (commentId) {
    if(this.comments.indexOf(commentId) !== -1){
        this.comments.remove(commentId);
    }
    return this.save();
};
product_schema.methods.toJSONAuthorFor = function(user){
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_category: this.id_category,
        name_cat: this.name_cat,
        state: this.state,
        location: this.location,
        images: this.product_images,
        favorites: this.favorites || 0,
        favorited: user ? user.isFavorite(this._id) : false,
        author: this.author.toProfileCommentJSON()
    };
};


mongoose.model('Product', product_schema);