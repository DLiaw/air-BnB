// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Sequelize } = require("sequelize");
const { raw } = require('express');
const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
    let { page, size } = req.query;
    if (!page || page <= 1 || isNaN(page)) page = 1;
    if (!size || size <= 1 || isNaN(size)) size = 50;
    if (size > 50) size = 50
    let pagination = {}

    pagination.limit = size;
    pagination.offset = size * (page - 1)

    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
        ...pagination
    })

    let Spots = []
    spots.forEach(spot => {
        Spots.push(spot.toJSON())
    })

    Spots.forEach(spot => {
        let avgUrl = {} // avgurl.previewimage = link.1
        spot.SpotImages.forEach(link => {
            if (link.preview) avgUrl.previewImage = link.url

        })
        if (!avgUrl.previewImage) avgUrl.previewImage = 'https://tools420.com/wp-content/uploads/2022/01/comingsoon.jpg'
        spot.previewImage = avgUrl.previewImage
        delete spot.SpotImages
    })

    for (let spot of Spots) {

        avgUrl = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [
                [Sequelize.fn('avg', Sequelize.col('stars')), 'rating']
            ],
            raw: true
        })
        if (avgUrl.rating) {
            spot.avgRating = Number(avgUrl.rating).toFixed(1)
        }
        delete spot.Reviews
    }

    return res.json({
        Spots,
        page: parseInt(page),
        size: parseInt(size)
    })
})


router.get('/current', requireAuth, async (req, res, next) => {
    const currentId = req.user.id

    const spots = await Spot.findAll({
        where: { ownerId: currentId }, include: [{ model: Review }, { model: SpotImage }]
    })
    let Spots = []
    spots.forEach(sp => {
        Spots.push(sp.toJSON())
    })
    let avgUrl = {}
    for (let spot of Spots) {

        avgUrl = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [
                [Sequelize.fn('avg', Sequelize.col('stars')), 'rating']
            ],
            raw: true
        })
        if (avgUrl.rating) {
            spot.avgRating = Number(avgUrl.rating).toFixed(1)
        }
        delete spot.Reviews
    }

    Spots.forEach(spot => {
        spot.SpotImages.forEach(link => {
            if (link.preview) avgUrl.previewImage = link.url
        })
        if (!avgUrl.previewImage) avgUrl.previewImage = 'https://tools420.com/wp-content/uploads/2022/01/comingsoon.jpg'
        spot.previewImage = avgUrl.previewImage
        delete spot.SpotImages
    })

    res.json({ Spots })
})


router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params
    const idd = await Spot.findByPk(spotId)
    if (!idd) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    const spot = await Spot.findAll({
        where: { id: spotId }, include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
            { model: Review, attributes: [] }
        ]
    })
    let Spots = []
    spot.forEach(sp => {
        Spots.push(sp.toJSON())
    })
    const numRe = await Review.findAll({
        where: { spotId: spotId }
    })
    if (numRe.length) Spots[0].numReviews = Number(numRe.length)

    if (!(numRe.length)) Spots[0].numReviews = 0

    let avgUrl = {}
    for (let spot of Spots) {

        avgUrl = await Review.findOne({
            where: { spotId: spotId },
            attributes: [
                [Sequelize.fn('avg', Sequelize.col('stars')), 'rating']
            ],
            raw: true
        })

        if (avgUrl.rating) {
            spot.avgStarRating = Number(avgUrl.rating).toFixed(1)
        }
        delete spot.Reviews
    }
    res.json(Spots[0])

})

const validateCreate = [
    check('name')
        .exists({ checkFasly: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a first name.'),
    check('address')
        .exists({ checkFasly: true })
        .withMessage("Please provide an address."),
    check('city')
        .exists({ checkFasly: true })
        .withMessage('Please provide a city.'),
    check('state')
        .exists({ checkFasly: true })
        .withMessage('Please provide a state.'),
    check('country')
        .exists({ checkFasly: true })
        .withMessage('Please provide a country'),
    check('description')
        .exists({ checkFasly: true })
        .isLength({ min: 20, max: 250 })
        .withMessage('Description must be between 20 and 250 characters.'),
    check('price')
        .exists({ checkFasly: true })
        .isNumeric({ checkFasly: true })
        .withMessage('Price must be a number.'),
    handleValidationErrors
]



router.post('/', validateCreate, requireAuth, async (req, res, next) => {
    const ownerId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (!address || !city || !state || !country || !name || !description || !price) {
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }
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
    if (req.user.id !== spot.ownerId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
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

const validateUpdate = [
    check('name')
        .exists({ checkFasly: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a first name.'),
    check('address')
        .exists({ checkFasly: true })
        .withMessage("Please provide an address."),
    check('city')
        .exists({ checkFasly: true })
        .withMessage('Please provide a city.'),
    check('state')
        .exists({ checkFasly: true })
        .withMessage('Please provide a state.'),
    check('country')
        .exists({ checkFasly: true })
        .withMessage('Please provide a country'),
    check('description')
        .exists({ checkFasly: true })
        .isLength({ min: 20, max: 250 })
        .withMessage('Description must be between 20 and 250 characters.'),
    check('price')
        .exists({ checkFasly: true })
        .isNumeric({ checkFasly: true })
        .withMessage('Price must be a number.'),
    handleValidationErrors

]

router.put('/:spotId', validateUpdate, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== spot.ownerId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }
    if (!address || !city || !state || !country || !name || !description || !price || isNaN(lat) || isNaN(lng)) {
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }
    const update = await spot.update({
        address, city, state, country, lat, lng, name, description, price,
        ownerId: Spot.ownerId
    })
    res.json(update)
})


router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== spot.ownerId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }
    await spot.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const id = await Spot.findByPk(spotId)
    if (!id) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const Reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            // { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    res.json({ Reviews })
})


router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const { review, stars } = req.body
    const id = await Spot.findByPk(spotId)
    const reviewList = await Review.findAll({
        where: {
            [Op.and]: { spotId, userId: req.user.id }
        }
    })

    if (!id) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (reviewList.length) {
        res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }
    if (review == '' || parseInt(stars) < 1 || parseInt(stars) > 5) {
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    }

    const newReview = await Review.build({
        review, stars,
        spotId, userId: req.user.id
    })
    await newReview.validate()
    await newReview.save()
    res.json(newReview)

})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const ownerSpot = await Booking.findByPk(spotId)
    if (!ownerSpot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (ownerSpot.userId !== req.user.id) {
        const Bookings = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.json({ Bookings })
    }
    if (ownerSpot.userId == req.user.id) {
        const Bookings = await Booking.findAll({
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ]
        })
        res.json({ Bookings })
    }
})


router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const thisSpotId = await Spot.findByPk(spotId, {
        include: [{ model: Booking }]
    })
    const { startDate, endDate } = req.body
    if (!thisSpotId) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (startDate >= endDate) {
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }
    const newThisSpotId = thisSpotId.toJSON()

    newThisSpotId.Bookings.forEach(date => {
        if (date.startDate >= startDate && date.endDate < endDate) {
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (date.startDate < startDate && date.endDate < endDate && startDate <= date.endDate) {
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (date.startDate > startDate && date.endDate > endDate && startDate >= date.endDate) {
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (date.startDate < startDate && date.endDate > endDate) {
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        if (date.startDate == startDate || date.endDate == startDate || date.startDate == endDate || date.endDate == endDate) {
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

    })

    const bookedDates = await Booking.build({
        startDate, endDate, spotId,
        userId: req.user.id
    })

    await bookedDates.validate()
    await bookedDates.save()
    res.json(bookedDates)

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
