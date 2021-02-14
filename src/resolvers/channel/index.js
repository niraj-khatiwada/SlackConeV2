const ChannelViewModel = require('./VM')
const TeamViewModel = require('../team/VM')

const { formatError } = require('../../tools/error')
const { validateInput } = require('../../tools/validations')

const inputValidations = {
  Mutation: {
    createChannel: (resolver = () => null) => {
      return validateInput(
        resolver,
        {
          name: 'required',
          teamId: 'required|integer',
        },
        {
          'name.required': 'Name is required',
          'teamId.required': 'Team Id is required',
          'teamId.integer': 'Team Id should be integer',
        }
      )
    },
  },
}

module.exports = {
  Mutation: {
    createChannel: inputValidations.Mutation.createChannel(
      async (_, { name, public, teamId }) => {
        const channelViewModel = new ChannelViewModel()
        const teamViewModel = new TeamViewModel()

        try {
          // If team exists
          const team = await teamViewModel.findByPK(teamId)
          if (!team) {
            return {
              success: false,
              message: 'No such team exists.',
              code: 'ERROR_TEAM_DOES_NOT_EXISTS',
            }
          }
          // If same team has same channel name or not
          const channelExists = await channelViewModel.findAll({ teamId, name })
          console.log(channelExists)
          if (channelExists.length > 0) {
            return {
              success: false,
              message: `Channel "${name}" already exists in team "${team.name}"`,
              code: 'ERROR_DUPLICATE_CHANNEL',
            }
          }

          const newChannel = await channelViewModel.create({
            name,
            public,
            teamId,
          })
          return {
            success: true,
            message: `New channel "${newChannel.name}" under team "${team.name}" created`,
          }
        } catch (error) {
          return {
            success: false,
            errors: formatError(error),
          }
        }
      }
    ),
  },
}
