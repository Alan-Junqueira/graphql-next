import { gql } from '@apollo/client'

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
`

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
`
