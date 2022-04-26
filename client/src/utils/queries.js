
import { gql } from "@apollo/client";

export const QUERY_INTERESTS = gql`
  interests {
    name
    groups {
      _id
      name
      description
    }
  }
`
export const QUERY_INTEREST = gql`
  query getInterest(name: $name) {
    name
    groups {
      _id
      name
      description
    }
  }
`
// export const QUERY_GROUPS = gql`
// query groups($username: String) {
//   groups(username: $username) {
//     groups {
//      _id
//     name
//     description
//     }
//   }
// }
// `;


export const QUERY_GROUP = gql`
 query getGroup(_id: $id) {
    _id
    name
    description
    members {
      _id
      username
      posts {
        _id
        postText
        createdAt
        username
      }
    }
    posts {
      _id
      postText
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query getUser(username: $username) {
    _id
    username
    email
    groups {
      _id
      name
      description
    }
    posts {
      _id
      postText
      createdAt
      username
    }
  }
`;

export const QUERY_ME = gql`
    me {
    _id
    username
    email
    posts {
      _id
      postText
      createdAt
      username
    }
    groups {
      _id
      name
      description
    }
  }
}
`;

export const QUERY_ME_BASIC = gql`
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;



