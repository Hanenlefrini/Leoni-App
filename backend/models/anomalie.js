'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anomalie extends Model {
    static associate(models) {
      Anomalie.belongsTo(models.Technicien, {
        foreignKey: 'technicienId',
        as: 'technicien',
      });
    }
  }
  Anomalie.init({
    matricule: DataTypes.STRING,
    ligne: DataTypes.STRING,
    description: DataTypes.TEXT,
    gravite: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    technicienId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Anomalie',
  });
  return Anomalie;
};
