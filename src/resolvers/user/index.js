const UserVM = require('./VM')

const { formatError } = require('../../tools/error')

module.exports = {
  Query: {
    user: (_, { id }) => {
      return id
    },
    users: () => {
      return ['Hey']
    },
  },
  Mutation: {
    createUser: async (_, { input: { email, username, password } }) => {
      const userViewModel = new UserVM()
      try {
        const findByEmail = await userViewModel.findByEmail(email)
        if (findByEmail) {
          return {
            success: false,
            message: 'Account with same email already exists.',
          }
        }
        const findByUsername = await userViewModel.findByEmail(email)
        if (findByUsername) {
          return {
            success: false,
            message: 'Account with same username already exists.',
          }
        }

        const hashedPassword = await userViewModel.hashPassword(password)

        await userViewModel.create({
          email,
          username,
          password: hashedPassword,
        })

        return { success: true, message: 'User created.' }
      } catch (error) {
        return {
          success: false,
          errors: formatError(error),
        }
      }
    },
  },
}
