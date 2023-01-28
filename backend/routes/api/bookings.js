// backend/routes/api/users.js
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

    let result = []

    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: { userId: userId }
    })

    for (let i = 0; i < bookings.length; i++) {

        let booking = bookings[i].toJSON()

        let spotId = bookings[i].toJSON().spotId

        let spot = await Spot.findByPk(spotId)

        const previewImage = await SpotImage.findAll({
            where: { spotId: spot.id, preview: true },
            attributes: ['url']
        })
        spot.dataValues.previewImage = previewImage[0].toJSON().url
        booking.Spot = spot
        result.push(booking)
    }

    return res.json(result)

})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const id = req.params.bookingId
    const { startDate, endDate } = req.body
    const bookingId = await Booking.findByPk(id)

    const date = new Date().toString()
    if (!bookingId) {
        res.json({
            message: "Booking couldn't be found",
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
