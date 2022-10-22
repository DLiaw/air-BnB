'use strict';
const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */
const reviewImage = [
  {
    reviewId: 1,
    url: 'https://a0.muscache.com/im/pictures/984f85a9-4b88-438b-be39-948b0e7fa992.jpg?im_w=1200'
  },
  {
    reviewId: 2,
    url: 'https://a0.muscache.com/im/pictures/c2055816-9a7a-41b2-ac12-fe8369597204.jpg?im_w=720'
  },
  {
    reviewId: 3,
    url: 'https://a0.muscache.com/im/pictures/ddea5244-c94b-4f27-9633-a1113a59d6ed.jpg?im_w=1200'
  },
  {
    reviewId: 4,
    url: 'https://a0.muscache.com/im/pictures/13025ceb-b91f-4ba6-aebb-fb6380dd17b4.jpg?im_w=720'
  },
  {
    reviewId: 5,
    url: 'https://a0.muscache.com/im/pictures/6e0fac41-2e0e-4e5a-b629-a82984e621a4.jpg?im_w=720'
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
    await ReviewImage.bulkCreate(reviewImage, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages', null, {})
  }
};
