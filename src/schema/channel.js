const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    channel(id: ID!): Channel
  }

  type Channel {
    id: ID!
    name: String!
    user: User!
    team: Team!
  }
`
