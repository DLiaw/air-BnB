'use strict';

const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */
const reviews = [
  {
    spotId: 1,
    userId: 1,
    review: 'Highly recommend it!!',
    stars: 5
  },
  {
    spotId: 2,
    userId: 2,
    review: 'Host was amazing!!',
    stars: 5
  },
  {
    spotId: 3,
    userId: 3,
    review: 'Wonderful experience!!',
    stars: 5
  },
  {
    spotId: 4,
    userId: 4,
    review: 'Very clean!!',
    stars: 5
  },
  {
    spotId: 5,
    userId: 5,
    review: 'Loved it!! Had a great time!',
    stars: 5
  }
  ,
  {
    spotId: 6,
    userId: 3,
    review: 'The Best',
    stars: 2
  }
  ,
  {
    spotId: 7,
    userId: 3,
    review: 'Love it!!',
    stars: 2
  }
  ,
  {
    spotId: 8,
    userId: 3,
    review: 'Awesome',
    stars: 2
  }
  ,
  {
    spotId: 9,
    userId: 3,
    review: 'Lovely',
    stars: 2
  }
  ,
  {
    spotId: 10,
    userId: 3,
    review: 'Amazing!!',
    stars: 2
  }
  ,
  {
    spotId: 11,
    userId: 3,
    review: 'Love it !!!',
    stars: 2
  }
  ,
  {
    spotId: 12,
    userId: 3,
    review: 'was alirght',
    stars: 2
  }
  ,
  {
    spotId: 13,
    userId: 3,
    review: 'Could be better',
    stars: 2
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
    await Review.bulkCreate(reviews, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
