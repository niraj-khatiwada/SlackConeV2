module.exports = (sequelize, DataTypes) => {
  const ChannelMember = sequelize.define('channel_member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  })

  return ChannelMember
}
