const { Message } = require('../../models')

class MessageViewModel {
  constructor() {
    this.db = Message
  }

  findByPK(id) {
    return this.db.findByPk(id)
  }

  create(data) {
    return this.db.create(data)
  }
}

module.exports = MessageViewModel
