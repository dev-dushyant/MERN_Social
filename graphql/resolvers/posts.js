const { AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts() {
             try {
                 const post = await Post.find().sort({createdAt: -1});
                 return post;
             }
             catch(err){
                 throw new Error(err);
             }
        },
        async getPost(_, { PostId }) {
            try {
                const post = await Post.findById(PostId);
                if(post){
                   return post; 
                } else {
                    throw new Error('Post not found')
                } 
            } catch (err) {
                throw new Error(err)
            }

        }
     },
     Mutation: {
         async createPost(_, { body }, context) {
            const user = checkAuth(context)
            const newPost = new Post({
                body,
                user: user.id,
                user_name : user.user_name,
                createdAt: new Date().toISOString()
            })
            const post =await newPost.save()
            return post
         },
        async deletePost(_, { PostId }, context) {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(PostId)
                if(user.user_name === post.user_name) {
                    await post.delete();
                    return ' Post Deleted Successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err){
                throw new Error(err)
            }
        }
     }
}