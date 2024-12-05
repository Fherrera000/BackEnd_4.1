'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfesorCurso extends Model {
    static associate(models) {

      this.belongsTo(models.Profesor, { foreignKey: 'ProfId' });

      this.belongsTo(models.Curso, { foreignKey: 'CursoId' });
    }
  }

  ProfesorCurso.init({
    ProfId: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesores',
        key: 'id'
      }
    },
    CursoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProfesorCurso',
    tableName: 'profesorcursos' 
  });

  return ProfesorCurso;
};