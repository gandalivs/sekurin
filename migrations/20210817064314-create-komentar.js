'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('komentars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coment: {
        type: Sequelize.STRING
      },
      id_artikel: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'artikels',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('komentars');
  }
};