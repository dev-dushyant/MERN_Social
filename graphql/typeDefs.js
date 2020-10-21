const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
       id: ID!
       body: String!
       createdAt: String!
       user_name: String! 
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
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(user_name: String!, password: String!): User !
    }
`