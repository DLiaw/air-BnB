'use strict';
const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */

const bookings = [
  {
    spotId: 5,
    userId: 5,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 4,
    userId: 4,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 3,
    userId: 3,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 2,
    userId: 2,
    startDate: '2023-10-18',
    endDate: '2023-10-26',
  },
  {
    spotId: 1,
    userId: 1,
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
    try { await Booking.bulkCreate(bookings, { validate: true }) }
    catch (e) {
      console.error('*****************', e.error)
    }
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
