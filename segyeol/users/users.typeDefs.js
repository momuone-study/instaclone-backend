import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createdAccount(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): User
  }

  type Query {
    seeProfile(username: String): User
  }
`;
// 스키마랑 sync 맞춰야함.