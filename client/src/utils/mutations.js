import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GROUP = gql`
  mutation   addGroup(input: $input, name: $name) {
    name
    groups {
      name
      description
    }
  }
`;

export const ADD_POST = gql`
   mutation addPost(postText: $postText, groupId: $groupId) {
    user {
      _id
      username
      email
      posts {
        _id
        postText
        createdAt
        username
      }
    }
      group {
        _id
        name
        description
        posts {
          _id
          postText
          createdAt
          username
        }
      }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost(postId: $postId) {
    user {
      _id
      username
      email
      posts {
        _id
        postText
      }
      groups {
        posts {
          _id
          postText
        }
      }
    }
  }
`;

export const JOIN_GROUP = gql`
mutation joinGroup(groupId: $groupId) {
    group {
      name
      description
      members {
        username
      }
    }
    user {
      username
      groups {
        name
        description
      }
    }
  }`;
