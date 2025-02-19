const bcrypt = require('bcrypt')
const { User } = require('../../models')

class UserViewModel {
  constructor() {
    this.db = User
  }

  findByPK(id) {
    return this.db.findByPk(id)
  }

  findByEmail(email) {
    return this.db.findOne({ where: { email } })
  }

  findByUsername(username) {
    return this.db.findOne({ where: { username } })
  }

  create(data) {
    return this.db.create(data)
  }

  hashPassword(password) {
    return bcrypt.hash(password, 12)
  }

  //For seeders
  async bulkCreate(data = []) {
    if (!Array.isArray(data)) {
      throw new Error('Must supply array of values')
    }
    const mapData = () =>
      new Promise((resolve) => {
        const final = []
        data.forEach((item) => {
          bcrypt
            .hash(item.password, 12)
            .then((password) => {
              final.push({ ...item, password })
              if (data.length === final.length) {
                resolve(final)
              }
            })
            .catch((error) => console.log(error))
        })
      })
    try {
      const newDataArray = await mapData()
      return this.db.bulkCreate(newDataArray)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = UserViewModel
