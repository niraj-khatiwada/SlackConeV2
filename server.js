const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const dotenv = require('dotenv')

const db = require('./src/models/index')
const { formatError } = require('./src/tools/error')

// eslint-disable-next-line no-undef
const PORT = process.env.SERVER_PORT
dotenv.config()

const app = express()

const typeDefs = require('./src/schema/index')
const resolvers = require('./src/resolvers/index')
const schema = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers,
})

const apolloServer = new ApolloServer({
  schema,
  context: { db },
  formatError,
})

apolloServer.applyMiddleware({ app: app })

app.use('/graphql', bodyParser.json())

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server started at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  })
})
