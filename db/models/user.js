'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING(75),
    email: DataTypes.STRING(255),
    hashedPassword: DataTypes.STRING.BINARY,
    professionalUser: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};