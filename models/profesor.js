'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    static associate(models) {
      this.belongsToMany(models.Curso, { through: models.ProfesorCurso, foreignKey: 'ProfId' });
    }
  }

  Profesor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    noEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Profesor',
    tableName: 'profesores'
  });

  return Profesor;
};