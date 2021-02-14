const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    channel(id: ID!): Channel
  }

  extend type Mutation {
    createChannel(
      name: String!
      public: Boolean = true
      teamId: ID!
    ): BasicResponse!
  }

  type Channel {
    id: ID!
    name: String!
    users: [User]
    team: Team!
  }
`
