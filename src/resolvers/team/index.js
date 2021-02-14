const TeamViewModel = require('./VM')

const { formatError } = require('../../tools/error')

module.exports = {
  Mutation: {
    createTeam: async (_, { name }) => {
      const teamViewModel = new TeamViewModel()

      try {
        const newTeam = await teamViewModel.create({ name, owner: 1 })
        return {
          success: true,
          message: `New team "${newTeam.name}" created`,
        }
      } catch (error) {
        return {
          success: false,
          errors: formatError(error),
        }
      }
    },
  },
}
