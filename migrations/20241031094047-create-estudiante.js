'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EstudianteCursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EstudianteId: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'estudiantes', 
          key: 'id'
        }
      },
      CursoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cursos', 
          key: 'id'
        }
      },
      calificacion: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 100
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EstudianteCursos');
  }
};