import { gql } from '@apollo/client'

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
`
