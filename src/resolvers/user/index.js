const UserVM = require('./VM')

module.exports = {
  Query: {
    user: async (_, { id }) => {
      const viewModel = new UserVM()
      try {
        const find = await viewModel.findByPK(id)
        console.log(find)
        if (!find) {
          throw new Error('No User found')
        }
        return find
      } catch (error) {
        throw new Error('Something went wrong')
      }
    },
  },
}
