import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
  query Novels {
    novels {
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

export const GET_NOVEL = gql`
  query Novel($id: ID!) {
    novel(id: $id) {
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
