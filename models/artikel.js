'use strict';
module.exports = (sequelize, DataTypes) => {
  const artikel = sequelize.define('artikel', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    foto: DataTypes.STRING
  }, { timestamps: false });
  artikel.associate = function (models) {
    // associations can be defined here
    [
      artikel.hasMany(models.komentar, {
        foreignKey: 'id_artikel'
      }),
      artikel.belongsTo(models.user, {
        foreignKey: 'id',
        target_key: 'id_user'
      })
    ]

  };
  return artikel;
};