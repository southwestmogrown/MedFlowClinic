'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {

      //add demo user
      return queryInterface.bulkInsert('Users', [
        {
          userName:"Demo-user",
          email:"demo@user.com",
          hashedPassword:bcrypt.hashSync('wordpass'),
          professionalUser: true,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          userName:"brokeMyArm-user",
          email:"broken@arm.com",
          hashedPassword:bcrypt.hashSync('wordpass'),
          professionalUser: false,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          userName:"armDoctor-user",
          email:"armDoctor@user.com",
          hashedPassword:bcrypt.hashSync('wordpass'),
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
