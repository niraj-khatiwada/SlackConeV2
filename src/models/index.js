/* eslint-disable no-undef */
const { Sequelize } = require('sequelize')

const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    logging: console.log,
    define: {
      underscored: false,
      timestamps: true,
    },
  }
)

const db = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Member: sequelize.import('./member'),
  ChannelMember: sequelize.import('./channelMember'),
}

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize()
