const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    messages: [Message]
  }

  extend type Mutation {
    createMessage(message: String!, channelId: ID!): BasicResponse!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
    channel: Channel!
  }
`
