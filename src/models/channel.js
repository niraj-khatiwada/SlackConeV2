// const { Sequelize, DataTypes } = require('sequelize')

// const sequelize = new Sequelize()

module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
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
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })

  Channel.associate = (models) => {
    Channel.belongsTo(models.Team, {
      foreignKey: { field: 'teamId', allowNull: false },
      constraints: false,
    })
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: { name: 'channel_id', field: 'channelId' },
      constraints: false,
    })
  }
  return Channel
}
