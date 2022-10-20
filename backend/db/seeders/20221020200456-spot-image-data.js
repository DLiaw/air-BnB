'use strict';
const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */

const spotImages = [
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/253bfa1e-8c53-4dc0-a3af-0a75728c0708.jpeg?im_w=720',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/bca57cdc-bc62-4366-91e9-03ba6c4059ee.jpeg?im_w=1200',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/bf485995-7fae-490e-bf2f-62d132d41a7e.jpg?im_w=720',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/c609aa31-59c1-4114-af15-937baf1b566f.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-620042564051847614/original/7298a99b-5a2b-4b3b-8bc1-b19e2d5fa803.jpeg?im_w=1200',
    preview: true
  },
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
    await SpotImage.bulkCreate(spotImages, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
