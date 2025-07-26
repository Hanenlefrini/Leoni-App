'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Anomalies', 'technicienId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Techniciens',  // nom exact de la table cible
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Anomalies', 'technicienId');
  }
};

