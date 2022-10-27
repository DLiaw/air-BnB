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


router.get('/current', requireAuth, async (req, res) => {
    const currentId = req.user.id
    let books = await Booking.findAll({
        where: { userId: currentId },
        include: [
            {
                model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
                include: [{ model: SpotImage }]
            },
        ],
    })

    let Bookings = []
    books.forEach(asdf => {
        Bookings.push(asdf.toJSON())
    })
    const one = await Booking.findByPk(currentId)
    const two = await Spot.findByPk(one.spotId)
    const three = await SpotImage.findByPk(two.id)


    if (three.dataValues.preview == true) {
        Bookings.forEach(check => {
            check.Spot.SpotImages.forEach(final => {
                check.Spot.previewImage = final.url
                delete check.Spot.SpotImages
            })
        })
    }


    res.json({ Bookings })
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const id = req.params.bookingId
    const { startDate, endDate } = req.body
    const bookingId = await Booking.findByPk(id)

    const date = new Date().toString()
    if (!bookingId) {
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
    if (date < startDate) {
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    const bookingIdJson = bookingId.toJSON()



    if (bookingIdJson.startDate >= startDate && bookingIdJson.endDate < endDate) {
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    if (bookingIdJson.startDate <= startDate && bookingIdJson.endDate < endDate && startDate <= bookingIdJson.endDate) {
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    if (bookingIdJson.startDate >= startDate && bookingIdJson.endDate > endDate && startDate >= bookingIdJson.startDate) {
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    if (bookingIdJson.startDate <= startDate && bookingIdJson.endDate > endDate) {
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    if (bookingIdJson.startDate == startDate || bookingIdJson.endDate == startDate || bookingIdJson.startDate == endDate || bookingIdJson.endDate == endDate) {
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    const updatedBooking = await bookingId.update({
        startDate, endDate, userId: req.user.id
    })

    res.json(updatedBooking)
})



router.delete('/:bookingId', requireAuth, async (req, res) => {
    const id = req.params.bookingId
    const bookingId = await Booking.findByPk(id)
    const date = new Date().toString()
    if (!bookingId) {
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (bookingId.startDate > date) {
        res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        })
    }
    if (bookingId.userId == req.user.id) {
        await bookingId.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})


module.exports = router;
