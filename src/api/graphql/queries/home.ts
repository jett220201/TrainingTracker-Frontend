import { gql } from "@apollo/client";

export const GET_HOME_DATA = gql`
  query {
  userInfo {
    currentBodyFatPercentage
    currentBodyMassIndex
    currentWeight
    userName
    weightProgressEntries {
      createdAt
      weight
    }
    workouts {
      id
      name
      workoutExercises {
        exercise {
          muscleGroup
        }
      }
    }
  }
}
`;