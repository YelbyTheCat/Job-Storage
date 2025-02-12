'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
/**
 * 
 * @param {*} sequelize 
 * @param {import ("sequelize").DataTypes} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User.init({
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.VIRTUAL,
      set(value) {
        this.setDataValue('passwordHash', bcrypt.hashSync(value, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
