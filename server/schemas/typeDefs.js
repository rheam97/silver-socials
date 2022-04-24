const {gql} = require('apollo-server-express')


const typeDefs = gql `
type Group {
    _id: ID
    name: String
    description: String
    members: [User]
    posts: [Post]
}
type User {
    _id: ID
    username: String
    email: String
    posts: []
    groups: [Group]
  }
type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
}
type Interest {
    _id: ID
    name: String
    groups: [Group]
}
type Query {
    me: User
    user(username: String!): User
    groups(username: String): [User]
    group(_id: ID!): Group
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGroup(name: String!): Group
    addPost(groupId: ID!, userId: ID!): Post
}
type Auth {
    token: ID!
    user: User
}`

module.exports= typeDefs

// comments to explain queries
// pull all groups associated with user for their profile
// groups(username: String): [User]
// look at data for a specific group
// group(_id: ID!): Group

// mutations neeed to be able to delete post