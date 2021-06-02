'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Questions', [
        {
          userId: 2,
          question: "What are these bumps on my arm?",
          voteCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          question: "I broke my arm, how I fix it without going to the hospital?",
          voteCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          question: "My arm is numb, should I go to the ER?",
          voteCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Questions', null, {});

  }
};
