const { Validator, addCustomMessages } = require('node-input-validator')

const { formatError } = require('./error')

const formatValidationErrors = (errors = {}) => {
  return Object.entries(errors).map(([key, value]) => ({
    path: key,
    message: value.message,
  }))
}

module.exports = {
  validateInput: (
    fn = () => null,
    validationObject = {},
    extendsMessages = {}
  ) => async (parent, inputArgs, ...args) => {
    const validation = new Validator(inputArgs, validationObject)

    addCustomMessages(extendsMessages)

    try {
      const isValid = await validation.check()
      console.log('---', formatValidationErrors(validation.errors))
      if (!isValid) {
        return {
          success: false,
          code: 'ERROR_INPUT_VALIDATION',
          errors: formatValidationErrors(validation.errors),
        }
      }
      return fn(parent, inputArgs, ...args)
    } catch (error) {
      return {
        success: false,
        errors: formatError(error),
        message: 'Something went wrong',
      }
    }
  },
}
