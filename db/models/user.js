'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName:{
      type:DataTypes.STRING(75),
      allowNull:false
    },
    email: {
      type:DataTypes.STRING(255),
      allowNull:false,
      unique:true
    },
    hashedPassword: {
      type:DataTypes.STRING.BINARY,
      allowNull:false
    },
    professionalUser: {
      allowNull: false,
      type:DataTypes.BOOLEAN // removed not null constraint
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
