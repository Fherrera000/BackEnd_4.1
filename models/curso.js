'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      this.belongsToMany(models.Estudiante, { through: models.EstudianteCurso });
      this.belongsToMany(models.Profesor, { through: models.ProfesorCurso, foreignKey: 'CursoId' });
    }
  }

  Curso.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clave: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos'
  });

  return Curso;
};