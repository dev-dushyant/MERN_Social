const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
       id: ID!
       body: String!
       createdAt: String!
       user_name: String! 
       comments: [Comment]!
       likes: [Like]!
    }
    type Comment {
        id: ID!
        createdAt: String!
        user_name: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        user_name:String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        user_name: String!
        createdAt: String!
    }
    input RegisterInput {
        user_name: String!
        password:String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(PostId: ID!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(user_name: String!, password: String!): User !
        createPost(body: String!): Post!
        deletePost(PostId: ID!): String!
        createComment(PostId: ID!, body: String!): Post!
        deleteComment(PostId: ID!, commentId: ID!): Post!
        likePost(PostId: ID!): Post!
    }
`