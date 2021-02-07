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
      foreignKey: { name: 'user_id', field: 'userId' },
      constraints: false,
    })
    Message.belongsTo(models.Channel, {
      foreignKey: { name: 'channel_id', field: 'channelId' },
      constraints: false,
    })
  }
  return Message
}
