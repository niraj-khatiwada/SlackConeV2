const { Team } = require('../../models')

class TeamViewModel {
  constructor() {
    this.db = Team
  }

  findByPK(id) {
    return this.db.findByPk(id)
  }

  create(data) {
    return this.db.create(data)
  }
}

module.exports = TeamViewModel
