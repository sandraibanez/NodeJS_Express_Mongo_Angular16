const mongoose = require('mongoose');
const { countDocuments } = require('../models/user.model');
const Product = mongoose.model('Product');
const product = require('../models/product_model.js');
// const comment = require('../models/comment.model.js');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

exports.get_param = async (req, res, next, slug_comment) => {
    try {
        const product = await Product.findOne({ slug: slug_comment });
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        req.product = product;
        return next();
    } catch (error) {
        res.status(500).json({msg: "An error has ocurred"});
    }
};

exports.get_comment = async (req, res, next) => {
    // try {
        const product = req.product;
        const get_product = await product.populate({ path: 'comments', populate: { path: 'author' } });
        return res.json({comments: get_product.comments.map(function (comment) { 
            return comment.toJSONFor();}),
        });
};

exports.create_comment = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        // if (!req.body.comment || req.body.comment.replace(/\s/g, "").length == 0) {
        //     return res.status(404).json({ msg: "Comment body not found" });
        // }
        
        const data = {
            body: req.body.comment,
            product: req.product._id,
            author: user._id,
        }
        // console.log("data",data);
        // res.json(data);
        const comment = new Comment(data);
        await comment.save();
        const comment_populate = await comment.populate({ path: 'author' });
        await Product.findOneAndUpdate({ slug: req.product.slug }, { $push: { comments: comment._id } });
        
        res.json({ comment: comment_populate.toJSONFor() });
    } catch (error) {
        res.status(500).json({msg: "An error has ocurred"});
    }
};
  
exports.delete_comment = async (req, res, next) => {
    // try {
        const userId = req.userId;

        const commenter = await User.findById(userId).exec();

        if (!commenter) {
            return res.status(401).json({
                message: "User Not Found"
            });
        }
        const { slug, id } = req.params;
        // console.log(id,slug);
        const product = await Product.findOne({slug}).exec();
        // console.log(product);
        if (!product) {
            return res.status(401).json({
                message: "Article Not Found"
            });
        }
    
        const comment = await Comment.findById(id).exec();
    
        // console.log(`comment author id: ${comment.author}`);
        // console.log(`commenter id: ${commenter._id}`)
    
        if (comment.author.toString() === commenter._id.toString()) {
            await product.removeComment(comment._id);
            await Comment.deleteOne({ _id: comment._id });
            return res.status(200).json({
                message: "comment has been successfully deleted!!!"
            });
        } else {
            return res.status(403).json({
                error: "only the author of the comment can delete the comment"
            })
        }
        // const comment = await Comment.findById(id);
        // if (String(comment.author) === String(user._id)) {
        //     await Comment.findByIdAndDelete(id);
        //     res.json({type: 'success', msg:'Comment deleted'});
        // } else {
        //     res.status(401).json({ msg: "No permision" });
        // }
    // } catch (error) {
    //     res.status(500).json({message: "Error updating the Product"});
    // }
};