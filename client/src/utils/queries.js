
import { gql } from "@apollo/client";

export const QUERY_INTERESTS = gql`
   query Interests {
  interests {
    name
    groups {
      name
      _id
      description
    }
  }
}
 `
export const QUERY_INTEREST = gql`
query Interest($name: String!) {
  interest(name: $name) {
    name
    groups {
      name
      description
      _id
    }
  }
}
`
export const QUERY_GROUPS = gql`
query GetGroups {
  getallgroups {
    _id
    name
    description
    members {
      _id
      username
    }
    posts {
      _id
      postText
      createdAt
      username
    }
  }
}

`;


export const QUERY_GROUP = gql`
 query Group($id: ID!) {
  group(_id: $id) {
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
}
`;

export const QUERY_USER = gql`
 query User($username: String!) {
  user(username: $username) {
    _id
    username
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

export const QUERY_ME = gql`
 query Me {
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
 query Me {
  me {
    _id
    username
    email
    }
    }
`;



