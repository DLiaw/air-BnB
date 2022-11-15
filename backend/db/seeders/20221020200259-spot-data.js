'use strict';
const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
const spots = [
  {
    ownerId: 1,
    address: '142-02 Cherry Ave.',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 74.00,
    lng: 40.00,
    name: 'NY Crib',
    description: 'Best bang for your buck at NYC!',
    price: 5200.00
  },
  {
    ownerId: 2,
    address: '519 South Fairfax Ave.',
    city: 'Kuala Lumpur',
    state: 'CA',
    country: 'Malaysia',
    lat: 88.00,
    lng: 66.00,
    name: 'Kuala Lumpur Crib',
    description: 'Near all the attractions',
    price: 3300.00
  },
  {
    ownerId: 3,
    address: '2519 NE 2nd Ave.',
    city: 'Taipei',
    state: 'FL',
    country: 'Taiwan',
    lat: 44.00,
    lng: 68.00,
    name: 'Taipei Crib',
    description: 'Hottest spot in town!',
    price: 3500.00
  },
  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Bali',
    state: 'WA',
    country: 'Indonesia',
    lat: 64.00,
    lng: 44.00,
    name: 'Bali Crib',
    description: 'Warm and cozy!',
    price: 3850.00
  },
  {
    ownerId: 5,
    address: '1065 West Argyle Street',
    city: 'Barcelona',
    state: 'IL',
    country: 'Spain',
    lat: 86.00,
    lng: 68.00,
    name: 'Barcelona Crib',
    description: 'Newly renovated.',
    price: 2450.00
  }
  ,
  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Dubai',
    state: 'WA',
    country: 'United Arab Emirates',
    lat: 64.00,
    lng: 44.00,
    name: 'Dubai Crib',
    description: 'Warm and cozy!',
    price: 4250.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Paris',
    state: 'WA',
    country: 'France',
    lat: 64.00,
    lng: 44.00,
    name: 'Paris Crib',
    description: 'Warm and cozy!',
    price: 3250.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'London',
    state: 'WA',
    country: 'England',
    lat: 64.00,
    lng: 44.00,
    name: 'London Crib',
    description: 'Warm and cozy!',
    price: 2250.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Singapore',
    state: 'WA',
    country: 'Malaysia',
    lat: 64.00,
    lng: 44.00,
    name: 'Singapore Crib',
    description: 'Warm and cozy!',
    price: 3250.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Bangkok',
    state: 'WA',
    country: 'Thailand',
    lat: 64.00,
    lng: 44.00,
    name: 'Bangkok Crib',
    description: 'Warm and cozy!',
    price: 1250.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Osaka',
    state: 'WA',
    country: 'Japan',
    lat: 64.00,
    lng: 44.00,
    name: 'Osaka Crib',
    description: 'Warm and cozy!',
    price: 2500.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Seoul',
    state: 'WA',
    country: 'Korea',
    lat: 64.00,
    lng: 44.00,
    name: 'Seoul Crib',
    description: 'Warm and cozy!',
    price: 2650.00
  },

  {
    ownerId: 4,
    address: '2621 5th Ave.',
    city: 'Tokyo',
    state: 'WA',
    country: 'Japan',
    lat: 64.00,
    lng: 44.00,
    name: 'Tokyo Crib',
    description: 'Warm and cozy!',
    price: 2750.00
  },

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
