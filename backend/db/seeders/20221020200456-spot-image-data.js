'use strict';

const { User, Spot, Booking, ReviewImage, Review, SpotImage } = require('../models')
/** @type {import('sequelize-cli').Migration} */



const spotImages = [
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5b3872b7-fc85-4e67-bd3b-dc69e298dae3?im_w=1200",
    preview: true
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/1e216331-d925-43f7-a087-bc2225b40b24?im_w=720",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/c664a7bc-8ffb-4848-a552-830780b33b8d?im_w=720",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5af27ed5-323d-482d-8605-a64d15ac1a97?im_w=720",
    preview: false
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/82979201-9f02-4f48-8476-1eaa691c35ee?im_w=720",
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/0b6a7d65-b5df-4c6c-addc-db2e84e65179.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/a6500011-52e0-4adb-81ff-cb911545921d.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/845d6e5a-9b12-41d2-a39c-b607a69c1168.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/66c6b6b6-577f-4fa6-ba8e-145bde229539.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/5ff7a25a-d499-42b0-bbba-37f1e0b7faa8.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-640803216696481692/original/585e9d1a-1e7a-4a03-938a-4dd47e392afd?im_w=1200',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-640803216696481692/original/ad3b1719-b578-48d9-a5aa-6bc61e5a2438?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-640803216696481692/original/3bfe2e56-b4f7-4dd8-830d-33e097eacd8d?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-640803216696481692/original/b4edcf86-840d-4b46-9701-48756d769a13?im_w=1200',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-640803216696481692/original/7caca7af-3e5a-475d-a97f-05511d7e17b8?im_w=1200',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/98cf26a7-9521-4a06-9e8c-4f888bd101c2.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/20e06c5c-a360-4621-a7cc-23c483d6aa65.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/a387a5d8-26f7-47b7-89fb-33ded3eb5b06.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/61e87728-13c4-401f-a0e0-bf6dc7ced926.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/85f9df1a-a959-4848-8b3b-651b8f337d60.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/03af0c71-007b-40a0-8d54-a4cd5f2751d5.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/b4c23f99-5fa1-4149-b50a-97b8ba49853c.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/17f0680b-3458-48e6-9677-8950dc18648f.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/58a3a782-1936-46da-a433-1e5147cdec6c.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://a0.muscache.com/im/pictures/dd4c779b-dc77-456e-9b4c-560f65aa4762.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/da598955-aa1f-4a67-bf8a-adc53564df14?im_w=720',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/dff7b07a-5176-4bc5-ae24-3fbbe3de1a4d?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/9d6f1977-522b-4c87-9f38-8d14698f490d?im_w=1200',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/441fc8e6-e32b-4b7f-a315-c9585e82c294?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/ae0f017f-7bc6-4cd3-b063-cf66305f91e8?im_w=720',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/3a048021-91fe-4fe5-822e-2abff7893a38.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30311984/original/37ae4339-660b-4724-8ba0-8261bc85f420.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/bb718bdc-f310-4271-a448-3cb29fd4eb82.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/f8ab21b1-ea01-4fb2-b129-613276bda95a.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://a0.muscache.com/im/pictures/d88cd3fc-3036-4c85-84e6-f2ea7cc1b575.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-655751056798434256/original/37984be2-4f53-4a0d-99ca-1f1126a6d869?im_w=1200',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-655751056798434256/original/b804bcb5-b63e-481c-b34b-d43219f8cca1?im_w=1440',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-655751056798434256/original/88a04f5b-8311-43f1-b7de-9ac9a5f548d5?im_w=720',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-655751056798434256/original/ac973de1-4378-42f8-9434-4545e10159c2?im_w=1200',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-655751056798434256/original/6ecb798a-3623-4787-83f1-bb95927937a2?im_w=1200',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://a0.muscache.com/im/pictures/922d81ff-925c-445e-8d38-ac5bab775e1a.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://a0.muscache.com/im/pictures/925c84cb-f8d9-4ceb-afd9-388270f5cc3f.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://a0.muscache.com/im/pictures/99ec059b-528a-4d28-81a5-87f87359c2bd.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://a0.muscache.com/im/pictures/12414034-8b77-4522-b028-14361457ca9a.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://a0.muscache.com/im/pictures/9b72ad9a-9e4b-4ea1-b460-10089cdcaa81.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/e1e25e03-02d8-44e6-b88f-be04f6afaafe.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/5895e2a4-f4f6-41af-ac05-228610d6abd2.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/5c6b7121-fe67-4d9c-8bfc-a621a97460b3.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/059badac-9569-4f97-86b7-6f0c7f73d85b.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/e97a766c-183b-4729-8bad-5361ac0f4692.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/e86fa329-7260-4608-9023-6eb61f88a438.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/5485491f-9d0b-4dd5-86db-b01c40018650.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/ca3509f8-655a-4123-a999-e0e00b15a2f8.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/e448d403-9834-4424-8d6a-eac1db762957.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/fbadfee7-34e0-4968-91e6-7925a5f8cb74.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/191b8c96-1345-409b-a4a1-3b01e5618dd1.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/11cf9f6f-8b15-416a-9b87-187e41bca018.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/1e9bac99-4814-4fa7-8ecf-743ef3388d6c.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/b541e81a-03e4-4669-8431-0f0850d02d65.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/7037fc4a-297a-4f89-ae1c-8d5ce002ef41.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-670175052891237401/original/582696fa-14b3-464b-ab62-9f14d2db3223?im_w=720',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-670175052891237401/original/c0b9a0ac-85ca-4d8c-8048-39445e8fd9f5?im_w=1200',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-670175052891237401/original/75fc88fe-9595-4db4-967c-c77ab4ccb7a8?im_w=1200',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-670175052891237401/original/f14ab6e0-a331-4362-ba70-8f47b0d7cb7c?im_w=1200',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/monet/Luxury-670175052891237401/original/ea86fe46-529b-430d-bb78-b66f3283632c?im_w=1200',
    preview: false
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
