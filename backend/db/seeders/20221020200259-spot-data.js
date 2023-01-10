'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
const spots = [
  {
    ownerId: 1,
    address: '142-02 Cherry Ave.',
    city: 'Antalya',
    state: 'NY',
    country: 'Turkey',
    lat: 74.00,
    lng: 40.00,
    name: '	Antalya Crib ',
    description: 'Beachfront with a View and Amenities Galore',
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
    description: 'Oceanfront Gem Beach Studio Exceptional Views!',
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
    description: 'Waterfront Cottage ❤️ Private Beach, Dock & Kayaks',
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
    description: 'Private Beach Front house Bali, Indonesia',
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
    description: 'Secluded Log Cabin, Amazing Views, Hot Tub & Wifi!',
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
    description: 'Peaceful Beachside Retreat at Dubai, United Arab Emirates',
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
    description: 'Sunsets on the Lake-Hot tub with Lake view!',
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
    description: 'Beautiful Lakefront Onsite Pool/Spa/Boats & Beach',
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
    description: 'Large 8 Bedroom Cottage with Beach',
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
    description: 'Beautiful Lake Front Cottage With A VIEW',
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
    description: 'Vista Estate On Lake Heaven Lake',
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
    description: 'Hidden Haven - 5 Bed Villa with pool & Sea Views',
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
