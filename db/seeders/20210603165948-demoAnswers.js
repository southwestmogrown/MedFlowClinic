'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {



      return queryInterface.bulkInsert('Answers', [
       {
         answer: "Judging on your description, it looks like you have a case of the Measles. However, I would need more details before making an official diagnosis. It's best to go see your primary care provider.",
         questionId: 1,
         voteCount: 0,
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
        answer: "I'm not sure that's a good idea. Go to the hospital.",
        questionId: 2,
        voteCount: 0,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ], {});

  },

  down: (queryInterface, Sequelize) => {



      return queryInterface.bulkDelete('Answers', null, {});

  }
};
