const { gql } = require('apollo-server-express')

const user = require('./user')
const team = require('./team')
const message = require('./message')
const channel = require('./channel')

const global = gql`
  type Query
  type Mutation

  type BasicResponse {
    success: Boolean!
    message: String
    errors: [ErrorResponse!]
    code: String
  }
  type ErrorResponse {
    path: String
    message: String
  }
`

module.exports = [user, message, team, channel, global]
