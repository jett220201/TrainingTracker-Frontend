import { gql } from "@apollo/client";

export const GET_PROFILE_DATA = gql`
query {
  userInfoById {
    activeGoalsCount
    createdAt
    currentWeight
    currentBodyFatPercentage
    currentBodyMassIndex
    firstName
    lastName
    workoutsCount
    gender
    height
  }
}
`;