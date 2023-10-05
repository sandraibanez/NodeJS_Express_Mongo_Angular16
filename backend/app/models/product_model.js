const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
    
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
    // product_images: {
    //     type: String,
    //     required: true
    // },
    favorites: Number,
    favorited: {
        type: Boolean,
        default: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
product_schema.methods.toProductCarouselResponse = function(){
    return {
        slug: this.slug,
        product_images: this.product_images,
        name: this.name
    };
}
product_schema.methods.toproductresponse = function(){
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_category: this.id_category,
        name_cat: this.name_cat,
        state: this.state,
        location: this.location,
        product_images:this.product_images
        // author: this.author,
        // favorites: this.favorites || 0,
    };
};

mongoose.model('Product', product_schema);