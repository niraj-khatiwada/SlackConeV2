const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    team(id: ID!): Team
  }

  extend type Mutation {
    createTeam(name: String!): BasicResponse!
  }

  type Team {
    id: ID!
    name: String!
  }
`
