const { gql } = require('apollo-server-express')

const user = require('./user')
const team = require('./team')
const message = require('./message')
const channel = require('./channel')

const global = gql`
  type Query
`

module.exports = [user, message, team, channel, global]
