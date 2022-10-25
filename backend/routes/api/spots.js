// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Sequelize } = require("sequelize");
const { raw } = require('express');



router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    let Spots = []
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
    })

    let avgUrl = {}
    Spots.forEach(spot => {
        spot.SpotImages.forEach(link => {
            if (link.preview) avgUrl.previewImage = link.url
        })
        if (!avgUrl.previewImage) avgUrl.previewImage = 'Coming Soon!'
        spot.previewImage = avgUrl.previewImage
        delete spot.SpotImages
    })

    for (let spot of Spots) {

        avgUrl = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [Sequelize.fn('avg', Sequelize.col('stars')), 'rating']
            ],
            raw: true
        })
        // console.log(spot)
        // console.log('spots', spots)
        spot.avgRating = avgUrl.rating
        delete spot.Reviews
    }

    // Spots.forEach(spot => {
    //     spot.previewImage = avgUrl.previewImage,
    //         spot.avgRating = avgUrl.rating,
    //     })

    res.json({ Spots })
})


router.get('/current', requireAuth, async (req, res, next) => {

    const currentId = req.user.id
    const spot = await Spot.findAll({
        where: {
            ownerId: currentId
        },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: [],
                where: {
                    preview: true
                }
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgStarRating'],
                [Sequelize.col("SpotImages.url"), "previewImage"]
            ]
        },
        group: ['Spot.id']
    })
    // let spots = [];
    // spot.forEach(userspot => {
    //     spots.push(userspot.toJSON())
    // })
    // console.log(spots)

    res.json({ 'Spots': spot })
})


router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params
    const id = await Spot.findByPk(spotId)
    if (!id) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner'

            },
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgStarRating'],

            ]
        }
    })

    res.json(spot)


})

router.post('/', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.build({
        address, city, state, country, name, description, price, lat, lng,
        ownerId: ownerId
    })

    await newSpot.validate(),
        await newSpot.save(),
        res.json(newSpot)
})


router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const image = await SpotImage.build({
        spotId,
        url,
        preview
    })
    await image.validate(),
        await image.save(),
        res.json({ id: image.id, url, preview })
})











// router.use((err, req, res, next) => {

//     let statusCode = err.statusCode || 500
//     res.status(statusCode)
//     res.json({
//         message: err.message,
//         statusCode: res.statusCode
//     })
// })
module.exports = router;
