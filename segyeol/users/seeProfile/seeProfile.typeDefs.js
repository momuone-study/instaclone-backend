import { gql } from "apollo-server";

export default gql`
  type Query {
    seeProfile(username: String!): User
  }
`;
// 스키마랑 sync 맞춰야함.
