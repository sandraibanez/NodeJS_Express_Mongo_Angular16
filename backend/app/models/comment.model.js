const mongoose = require('mongoose');
const User = require('./user.model');

const comment_schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
},
    {
        timestamps: true
    });


    comment_schema.methods.toCommentResponse = async function (user) {
        const authorObj = await User.findById(this.author).exec();
        return {
            id: this._id,
            body: this.body,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            author: authorObj.toProfileJSON(user)
        }
    
    };
    comment_schema.methods.toJSONFor = function () {
        return {
            id: this._id,
            body: this.body,
            createdAt: this.createdAt,
            author: this.author.toProfileCommentJSON()
        };
    };
module.exports = mongoose.model('Comment', comment_schema);
