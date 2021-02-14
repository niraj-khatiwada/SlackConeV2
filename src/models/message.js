module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: { name: 'userId', field: 'userId', allowNull: false },
      constraints: false,
    })
    Message.belongsTo(models.Channel, {
      foreignKey: { name: 'channelId', field: 'channelId', allowNull: false },
      constraints: false,
    })
  }
  return Message
}
