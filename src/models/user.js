module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username is already taken',
      },
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: 'Username must be at least 5 characters long.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email is already taken',
      },
      allowNull: false,
      validate: {
        isEmail: { msg: 'Invalid email.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          message: "Password can't be less than 6 characters",
        },
      },
    },
  })

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: { name: 'user_id', field: 'userId' },
      constraints: false,
    })
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'user_id',
        field: 'userId',
      },
      constraints: false,
    })
  }
  return User
}
