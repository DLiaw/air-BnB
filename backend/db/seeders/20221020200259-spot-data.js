'use strict';
const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
const spots = [
  {
    ownerId: 1,
    address: '142-02 Cherry Ave.',
    city: 'Flushing',
    state: 'NY',
    country: 'USA',
    latitude: 74.00,
    longitude: 40.00,
    name: 'NY Crib',
    description: 'Best bang for your buck at NYC!',
    price: 200.00
  },
  {
    ownerId: 2,
    address: '519 South Fairfax Ave.',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    latitude: 88.00,
    longitude: 66.00,
    name: 'LA Crib',
    description: 'Near all the attractions',
    price: 300.00
  },
  {
    ownerId: 3,
    address: '2519 NE 2nd Ave.',
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    latitude: 44.00,
    longitude: 68.00,
    name: 'Miami Crib',
    description: 'Hottest spot in town!',
    price: 500.00
  },
  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    latitude: 64.00,
    longitude: 44.00,
    name: 'Seattle Crib',
    description: 'Warm and cozy!',
    price: 250.00
  },
  {
    ownerId: 5,
    address: '1065 West Argyle Street',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    latitude: 86.00,
    longitude: 68.00,
    name: 'Chicago Crib',
    description: 'Newly renovated.',
    price: 350.00
  }
]
/** @type {import('sequelize-cli').Migration} */
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

    await Spot.bulkCreate(spots, { validate: true })

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
