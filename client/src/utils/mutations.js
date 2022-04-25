import { gql } from '@apollo/client';

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
  mutation addGroup($thoughtText: String!) {
    addThou(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      postCount
      posts {
        _id
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($thoughtId: ID!, $postBody: String!) {
    addReaction(thoughtId: $thoughtId, postBody: $postBody) {
      _id
      postCount
      posts {
        _id
        postBody
        createdAt
        username
      }
    }
  }
`;


export const REMOVE_POST = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id) {
      _id
      username
      posts {
        _id
        username
      }
    }
  }
`;
