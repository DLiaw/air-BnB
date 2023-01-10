'use strict';

const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: 'Nhut',
    lastName: 'Ngo',
    username: 'Nhuts',
    hashedPassword: bcrypt.hashSync('1password'),
    email: 'Nhuts@gmail.com'
  },
  {
    firstName: 'NhutOne',
    lastName: 'NgoOne',
    username: 'NhutsOne',
    hashedPassword: bcrypt.hashSync('2password'),
    email: 'Nhuts1@gmail.com'
  },
  {
    firstName: 'NhutTwo',
    lastName: 'NgoTwo',
    username: 'NhutsTwo',
    hashedPassword: bcrypt.hashSync('3password'),
    email: 'Nhuts2@gmail.com'
  },
  {
    firstName: 'NhutThree',
    lastName: 'NgoThree',
    username: 'NhutsThree',
    hashedPassword: bcrypt.hashSync('4password'),
    email: 'Nhuts3@gmail.com'
  },
  {
    firstName: 'NhutFour',
    lastName: 'NgoFour',
    username: 'NhutsFour',
    hashedPassword: bcrypt.hashSync('5password'),
    email: 'Nhuts4@gmail.com'
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate(users, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
