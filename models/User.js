const {DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,   
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,   
  },
  cin: {
    type: DataTypes.STRING,
    allowNull: false,   
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,     
    validate: {
      isEmail: true,  
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  role: {
    type: DataTypes.ENUM('admin', 'moderator', 'user'), 
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  timestamps: true,  
});

User.sync({ alter: true })
  .then(() => {
    console.log('User table has been synced.');
  })
  .catch((err) => {
    console.error('Error syncing User table:', err);
  });

module.exports = User;
