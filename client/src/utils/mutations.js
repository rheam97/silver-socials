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
  mutation addUser($username: String!, $image: String, $email: String!, $password: String!) {
    addUser(username: $username, image: $image, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GROUP = gql`
 mutation AddGroup($name: String!, $input: addThisGroup) {
  addGroup(name: $name, input: $input) {
    name
    groups {
      _id
      name
      description
    }
  }
}
`;

export const ADD_POST = gql`
  mutation AddPost($postText: String!, $groupId: ID!) {
  addPost(postText: $postText, groupId: $groupId) {
    user {
      _id
      username
      image
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
        posts {
          _id
          postText
          createdAt
          username
        }
      }
    }
  }
}
`;

export const REMOVE_POST = gql`
mutation RemovePost($postId: ID!) {
  removePost(postId: $postId) {
    user {
      _id
      username
      posts {
        _id
        postText
      }
      groups {
        _id
        name
        description
        posts {
          _id
          postText
        }
      }
    }
  }
}
`;

export const JOIN_GROUP = gql`
mutation JoinGroup($groupId: ID!) {
  joinGroup(groupId: $groupId) {
    user {
      _id
      username
      groups {
        _id
        name
        description
      }
    }
    group {
      _id
      name
      description
      members {
        _id
        username
      }
    }
  }
}`;
