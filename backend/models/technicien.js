'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technicien extends Model {
    static associate(models) {
      // Un technicien a plusieurs anomalies
      Technicien.hasMany(models.Anomalie, {
        foreignKey: 'technicienId',
        as: 'anomalies',
      });
    }
  }
  Technicien.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    matricule: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Technicien',
  });
  return Technicien;
};
