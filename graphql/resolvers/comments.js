const { UserInputError } = require('apollo-server')


const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {
        createComment: async(_, {PostId, body}, context) => {
            const {user_name} = checkAuth(context)
            if(body.trim() === ''){
                throw new UserInputError ('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }

            const post = await Post.findById(PostId)
            if(post){
                post.comments.unshift({
                    body,
                    user_name,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } else throw new UserInputError('Post not found')
        }
    }
}