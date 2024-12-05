'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('estudiantes', [
      {
        nombre: 'Miranda Gonzales',
        matricula: 22222,
        semestreIngreso: '2016-2',
        creditosCursados: 200,
      },
      {
        nombre: 'Maria Gomez',
        matricula: 11111,
        semestreIngreso: '2017-1',
        creditosCursados: 150,
      },
      {
        nombre: 'Luis García',
        matricula: 44444,
        semestreIngreso: '2018-3',
        creditosCursados: 180,
      },
      {
        nombre: 'Juan Camaney',
        matricula: 33333,
        semestreIngreso: '2016-2',
        creditosCursados: 200,
      },
      {
        nombre: 'Ana Pérez',
        matricula: 66666,
        semestreIngreso: '2017-1',
        creditosCursados: 150,
      },
      {
        nombre: 'Luis García',
        matricula: 999999,
        semestreIngreso: '2018-3',
        creditosCursados: 180,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('estudiantes', null, {});
  }
};