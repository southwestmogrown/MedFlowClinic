'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(model.Question, {foreignKey: "questionId"})
    Answer.hasMany(model.Comment, {foreignKey: "answerId"})
  };
  return Answer;
};
