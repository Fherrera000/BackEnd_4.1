'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos', [
      {
        nombre: 'Ingles',
        clave: 49234,
        creditos: 6,
      },
      {
        nombre: 'Algebra',
        clave: 342354,
        creditos: 8,
      },
      {
        nombre: 'Programación 2',
        clave: 78901,
        creditos: 5,
      },
      {
        nombre: 'Cálculo',
        clave: 12345,
        creditos: 6,
      },
      {
        nombre: 'Español',
        clave: 54683,
        creditos: 8,
      },
      {
        nombre: 'Programación I',
        clave: 78901,
        creditos: 5,
      }
      
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cursos', null, {});
  }
};