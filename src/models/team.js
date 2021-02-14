// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize()
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Team.associate = (models) => {
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: { name: 'teamId', field: 'teamId' },
      constraints: false,
    })

    Team.belongsTo(models.User, {
      foreignKey: { allowNull: false, name: 'owner' },
      constraints: false,
    })
  }
  return Team
}
