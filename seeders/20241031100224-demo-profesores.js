'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profesores', [
      {
        nombre: 'Jose Emmanuel',
        noEmpleado: 123456,
      },
      {
        nombre: 'María López',
        noEmpleado: 654321,
      },
      {
        nombre: 'Carlos García',
        noEmpleado: 789012,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profesores', null, {});
  }
};