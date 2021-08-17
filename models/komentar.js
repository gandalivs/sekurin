'use strict';
module.exports = (sequelize, DataTypes) => {
  const komentar = sequelize.define('komentar', {
    coment: DataTypes.STRING,
    id_artikel: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'artikel',
        key: 'id'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'user',
        key: 'id'
      }
    }
  }, { timestamps: false });
  komentar.associate = function (models) {
    [
      komentar.belongsTo(models.artikel, {
        foreignKey: 'id',
        target_key: 'id_artikel'
      }),
      komentar.belongsTo(models.user, {
        foreignKey: 'id',
        target_key: 'id_user'
      })
    ]
  };
  return komentar;
};