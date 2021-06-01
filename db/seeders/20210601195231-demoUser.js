'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      //add demo user
      return queryInterface.bulkInsert('Users', [
        {userName:"Demo-user", email:"demo@user.com", hashedPassword: "Wordpass", professionalUser: true, createdAt:new Date(), updatedAt:new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
  }
};
