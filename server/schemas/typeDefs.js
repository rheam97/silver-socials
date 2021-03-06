const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Group {
    _id: ID
    name: String
    description: String
    image: String
    members: [User]
    posts: [Post]
  }
  input addThisGroup {
    name: String!
    description: String!
    image: String
  }
  type User {
    _id: ID
    username: String
    image: String
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
    interest(name: String!): Interest
    interests: [Interest]
    me: User
    posts: [Post]
    post(postId: ID!): Post
    user(username: String!): User
    users: [User]
    getallgroups: [Group]
    groups(username: String!): User
    group(_id: ID!): Group
    checkout(donationAmtDollars: Float!): Checkout
  }
  type AddPostResponse {
    user: User
    group: Group
  }
  type joinGroupResponse {
    user: User
    group: Group
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, image: String, password: String!): Auth
    addGroup(input: addThisGroup, name: String!): Interest
    addPost(postText: String!, groupId: ID!): AddPostResponse
    removePost(postId: ID!): AddPostResponse
    joinGroup(groupId: ID!): joinGroupResponse
  }
  type Auth {
    token: ID!
    user: User
  }
  
  type Checkout {
  session: ID
}
`;

module.exports = typeDefs;
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
