'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.STRING,
    foto: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, { timestamps: false });
  user.associate = function (models) {
    // associations can be defined here
    [
      user.hasMany(models.komentar, {
        foreignKey: 'id_user'
      }),
      user.hasMany(models.artikel, {
        foreignKey: 'id_user'
      })
    ]
  };
  return user;
};