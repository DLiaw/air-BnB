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

// get all spots

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


// get current spot

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

// get spot by id

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

// create a spot

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

// create spot images

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

// update a spot by id

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

// delete a spot by id

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

// get all reviews by spot id

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

// create a review with spot id

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

// get all bookings by spot id

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })
    return res.json(spotBookings)
})

// create bookings with spot id

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)
    const spotBooking = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })
    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (startDate >= endDate) {
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "End date cannot be on or before start date"
            }
        })
    }

    spotBooking.forEach(booking => {
        // existing start (jan 2nd) >= newStartDate (jan 1st) && existing endDate (jan 3rd) <= newEndDate (jan 4th)
        // cant have existing booking inside of new booking
        if (booking.startDate >= startDate && booking.endDate <= endDate) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        // existing startDate (jan 1st) <= newStartDate (jan 2nd) && existing endDate  (jan 3rd) <= newEndDate (jan 4th)
        //  && newStartDate (jan 2nd) <= existing endDate (jan 3rd)
        // cant start in between and end after existing booking
        if (booking.startDate <= startDate && startDate <= booking.endDate) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        // existing startDate (jan 2nd) >= newStartDate (jan 1st) && existing endDate (jan 4th) >= newEndDate (jan 3rd)
        // && newStartDate (jan 1st) >= existing endDate (jan 4th)
        // cant end in between and end after existing booking
        if (booking.startDate <= endDate && endDate <= booking.endDate) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        // existing startDate (jan 1st) <= newStartDate (jan 2nd) && existing endDate (jan 4th) >= newEndDate (jan 3rd)
        // cant book in between someone elses dates
        if (booking.startDate <= startDate && booking.endDate >= endDate) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        // cant have any dates be the same
        if (booking.startDate == startDate || booking.endDate == startDate || booking.startDate == endDate || booking.endDate == endDate) {
            return res.json({
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
    const newlyBooked = await Spot.findByPk(spotId)
    const previewImage = await SpotImage.findAll({
        where: { spotId: spotId, preview: true },
        attributes: ['url']
    })

    bookedDates.Spot = newlyBooked
    bookedDates.Spot.dataValues.previewImage = previewImage[0].toJSON().url
    console.log(bookedDates, 'FROM BACK ENDDDDDDDDDDDDDD')
    return res.json(bookedDates)

})

module.exports = router;
