import { gql } from "@apollo/client";

export const GET_WORKOUTS = gql`
query GetWorkoutsByUser ( $search: String ) {
  workoutsByUser(search: $search) {
    totalWorkouts
    workouts {
      id
      name
      workoutExercises {
        id
        repetitions
        sets
        weight
        restTime
        exercise {
          description
          id
          muscleGroup
          muscleGroupName
          name
        }
      }
    }
  }
}
`;