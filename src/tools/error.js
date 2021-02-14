const graphql = require('apollo-server-express')
const sequelize = require('sequelize')

const { devConsole } = require('./helpers')

exports.formatError = (error) => {
  devConsole(error)

  if (error instanceof sequelize.ValidationError) {
    return error.errors.map((x) => ({ path: x.path, message: x.message }))
  }

  if (error instanceof graphql.ValidationError) {
    devConsole(error)
    return {
      success: false,
      code: 'ERROR_GRAPHQL_VALIDATION',
      message: null,
      errors: [{ path: null, message: error.message }],
    }
  }

  return [{ path: null, message: 'Something went wrong.' }]
}

// Exception
// The graphql-constraint-directive will check this before entering resolver so we need to throw same response to match other error responses here

// console.log('-///--', _error)
// if (
//   _error.originalError &&
//   _error.originalError.code === 'ERR_GRAPHQL_CONSTRAINT_VALIDATION'
// ) {
//   return {
//     success: false,
//     code: 'ERROR_VALIDATION',
//     error: error.originalError.fieldName,
//     context: error.originalError.context,
//   }
// }
