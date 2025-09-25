import { gql } from "@apollo/client";

export const GET_PROGRESS = gql`
query {
  userProgressByUser {
    bodyFatProgressPercent
    bodyMassIndexProgressPercent
    currentBodyFatPercentage
    currentBodyMassIndex
    currentWeight
    goalBodyFatPercentage
    goalBodyMassIndex
    goalWeight
    weightProgressPercent
    progressEntries {
      bodyFatPercentage
      bodyMassIndex
      createdAt
      weight
    }
  }
}
`