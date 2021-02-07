const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    team(id: ID!): Team
  }

  type Team {
    id: ID!
    name: String!
  }
`
