import { gql } from "@apollo/client";

export const GET_PAGINATE_EXERCISES = gql`
query GetPaginateExercises(
  $muscle: Int
  $searchInput: String
  $firstElement: Int
  $after: String
  $lastElement: Int
  $before: String
) {
  exercises(
    muscleGroup: $muscle
    search: $searchInput
    first: $firstElement
    last: $lastElement
    after: $after
    before: $before
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        description
        muscleGroupName
        muscleGroup
        name
      }
    }
  }
}
`