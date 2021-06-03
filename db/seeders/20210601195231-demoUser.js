const bcrypt = require('bcryptjs')

'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {

      //add demo user
      return queryInterface.bulkInsert('Users', [
        {
          userName:"Demo-user",
          email:"demo@user.com",
          hashedPassword: bcrypt.hashSync('Wordpass'),
          professionalUser: true,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          userName:"brokeMyArm-user",
          email:"broken@arm.com",
          hashedPassword: bcrypt.hashSync('Wordpass'),
          professionalUser: false,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          userName:"armDoctor-user",
          email:"armDoctor@user.com",
          hashedPassword: bcrypt.hashSync('Wordpass'),
          professionalUser: true,
          createdAt:new Date(),
          updatedAt:new Date()
        },

      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});
  }
};
