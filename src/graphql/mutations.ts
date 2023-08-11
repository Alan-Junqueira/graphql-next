import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
  mutation Mutation($image: String, $title: String) {
    addNovel(image: $image, title: $title) {
      authors {
        id
        name
        novelId
      }
      updatedAt
      title
      image
      id
      createdAt
    }
  }
`;

export const DELETE_NOVEL = gql`
  mutation Mutation($id: ID!) {
    deleteNovel(id: $id) {
      authors {
        id
        name
        novelId
      }
      createdAt
      id
      image
      title
      updatedAt
    }
  }
`;

export const UPDATE_NOVEL = gql`
  mutation Mutation($id: ID!, $title: String, $image: String) {
    updateNovel(id: $id, title: $title, image: $image) {
      authors {
        id
        name
        novelId
      }
      createdAt
      id
      image
      title
      updatedAt
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($novelId: ID!, $name: String) {
    addAuthor(novelId: $novelId, name: $name) {
      id
      name
      novelId
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation Mutation($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      novelId
    }
  }
`;
