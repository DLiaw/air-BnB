'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */

const bookings = [
  {
    spotId: 5,
    userId: 1,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 4,
    userId: 5,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 3,
    userId: 4,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 2,
    userId: 3,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 1,
    userId: 2,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
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

    await Booking.bulkCreate(bookings, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
