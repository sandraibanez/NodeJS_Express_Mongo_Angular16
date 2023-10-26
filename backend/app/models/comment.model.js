var mongoose = require('mongoose');

var comment_schema = mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

// Requires population of author
comment_schema.methods.toJSONFor = function () {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        author: this.author.toProfileCommentJSON()
    };
};

module.exports = mongoose.model('Comment', comment_schema);
