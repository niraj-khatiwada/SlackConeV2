const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    createUser(input: UserInput!): BasicResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    teams: [Team!]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
`
