'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      this.belongsToMany(models.Curso, { through: models.EstudianteCurso });
    }
  }

  Estudiante.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    semestreIngreso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creditosCursados: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'estudiantes'
  });

  return Estudiante;
};