import { gql } from "@apollo/client";

export const GET_GOALS = gql`
query {
  goalsByUser {
    activeGoals
    completedGoals
    overdueGoals
    totalGoals
    userGoals {
      id
      createdAt
      currentValue
      description
      goalDate
      goalDirection
      goalStatus
      goalType
      progressPercent
      targetValue
    }
  }
}
`;