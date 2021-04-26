const crypto = require('crypto')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      set: function (val) {
        this.setDataValue('username', val.toLowerCase());
      },
      notEmpty: true,
      notNull: true,
      is: /^[a-zA-Z0-9\._]{4,32}$/,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      set: function (val) {
        this.setDataValue('email', val.toLowerCase());
      },
      isEmail: true,
      notEmpty: true,
      notNull: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      get() {
        return () => this.getDataValue('salt')
      }
    }
  });

  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  User.prototype.verifyPassword = function (enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
  }

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)

  return User;
};