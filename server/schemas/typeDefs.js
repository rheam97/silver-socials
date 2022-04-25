const {gql} = require('apollo-server-express')


const typeDefs = gql `
type Group {
    _id: ID
    name: String
    description: String
    members: [User]
    posts: [Post]
}
input addThisGroup {
    name: String!
    description: String!
}
type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
    groups: [Group]
  }
type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
}
type Interest {
    name: String
    groups: [Group]
}
type Query {
    interest (name: String!): Interest
    interests: [Interest]
    me: User
    user(username: String!): User
    users: [User]
    groups(username: String!): User
    group(_id: ID!): Group
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGroup(input: addThisGroup): Interest
    addPost(postText: String!): Post
    removePost(postId: ID!): Group
}
type Auth {
    token: ID!
    user: User
}`

module.exports= typeDefs
// *** should remove post contain two returned objects
// comments to explain queries
// pull all groups associated with user for their profile
// groups(username: String): [User]
// look at data for a specific group
// group(_id: ID!): Group
// pull all posts within a group


// mutations neeed to be able to delete post

// removed from query because causing errors
// can add back in
// interest (name: name!): Interest

// for a query, the inside of the parentheses is the query parameter
// type Query {
//   thoughts(username: String): [Thought]}

// With this, we've now defined our thoughts query that it could receive a parameter if we wanted. 
// In this case, the parameter would be identified as username and would have a String data type.

