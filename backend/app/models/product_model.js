const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
    
const product_shcema = new mongoose.Schema({
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
    favorited: {
        type: Boolean,
        default: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

product_shcema.plugin(uniqueValidator, { msg: "already taken" });

product_shcema.pre('save', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});//pre

product_shcema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};//slugify

mongoose.model('Product', product_shcema);