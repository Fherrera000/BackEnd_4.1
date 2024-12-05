'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstudianteCurso extends Model {
    static associate(models) {
      this.belongsTo(models.Estudiante, { foreignKey: 'EstudianteId' });
      this.belongsTo(models.Curso, { foreignKey: 'CursoId' });
    }
  }

  EstudianteCurso.init({
    EstudianteId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudiantes', 
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
    },
    calificacion: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    sequelize,
    modelName: 'EstudianteCurso',
    tableName: 'estudiantecursos'
  });

  return EstudianteCurso;
};