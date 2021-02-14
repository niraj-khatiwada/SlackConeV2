const MessageViewModel = require('./VM')
const ChannelViewModel = require('../channel/VM')

const { formatError } = require('../../tools/error')
const { validateInput } = require('../../tools/validations')

const inputValidations = {
  Mutation: {
    createMessage: (resolver = () => null) => {
      return validateInput(
        resolver,
        {
          message: 'required',
          channelId: 'required|integer',
        },
        {
          'message.required': 'Name is required',
          'channelId.required': 'Channel Id is required',
          'channelId.integer': 'Channel Id should be integer',
        }
      )
    },
  },
}

module.exports = {
  Mutation: {
    createMessage: inputValidations.Mutation.createMessage(
      async (_, { message, channelId }) => {
        const messageViewModel = new MessageViewModel()
        const channelViewModel = new ChannelViewModel()

        try {
          // If channel exists
          const channel = await channelViewModel.findByPK(channelId)
          if (!channel) {
            return {
              success: false,
              message: 'No such channel exists.',
              code: 'ERROR_CHANNEL_DOES_NOT_EXISTS',
            }
          }

          await messageViewModel.create({
            text: message,
            channelId,
            userId: 1, //For now
          })
          return {
            success: true,
            message: `New message sent to channel ${channel.name}`,
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
