const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    messages: [Message]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
    channel: Channel!
  }
`
