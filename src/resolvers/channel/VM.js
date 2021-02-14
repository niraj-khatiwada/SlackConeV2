const { Channel } = require('../../models')

class ChannelViewModel {
  constructor() {
    this.db = Channel
  }

  findByPK(id) {
    return this.db.findByPk(id)
  }

  create(data) {
    return this.db.create(data)
  }

  findAll(fields) {
    return this.db.findAll({ where: { ...fields } })
  }

  findAllByTeamId(teamId) {
    return this.db.findAll({ where: { teamId } })
  }
}

module.exports = ChannelViewModel
