'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName:{
      type: DataTypes.STRING(75),
      allowNull: false
    },
    email: {
      type:DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
    professionalUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, {foreignKey: "userId"});
    User.hasMany(models.Answer, {foreignKey: "userId"});
    User.hasMany(models.Comment, {foreignKey: "userId"});
  };
  return User;
};
