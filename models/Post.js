const { model, Schema } = require('mongoose');

const postSchema = new Schema( {
    user_name: String,
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            user_name: String,
            createdAt: String
        }
    ],
    likes: [
        {
            user_name: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);
