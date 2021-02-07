const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    teams: [Team!]!
  }
`
