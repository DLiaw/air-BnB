// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Sequelize } = require("sequelize");
const { raw } = require('express');


router.get('/current', requireAuth, async (req, res) => {
    const currentId = req.user.id
    const findReviews = await Review.findAll({
        where: { userId: currentId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] }, include: [{ model: SpotImage }] },
            { model: ReviewImage, attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] } }
        ]
    })


    let Reviews = []
    findReviews.forEach(asdf => {
        Reviews.push(asdf.toJSON())
    })

    const one = await Review.findByPk(currentId)
    const two = await Spot.findByPk(one.spotId)
    const three = await SpotImage.findByPk(two.id)


    if (three.dataValues.preview == true) {
        Reviews.forEach(check => {
            check.Spot.SpotImages.forEach(final => {
                check.Spot.previewImage = final.url
                delete check.Spot.SpotImages
            })
        })
    }


    res.json({ Reviews })
})


router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const reviewId = req.params.reviewId
    const foundReview = await Review.findByPk(reviewId, {
        include: [
            { model: ReviewImage, attributes: ['url'] }
        ]
    })
    if (!foundReview) {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== foundReview.userId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }
    if (foundReview.ReviewImages.length >= 10) {
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }
    const newReviewImage = await ReviewImage.build({
        url, reviewId
    })
    await newReviewImage.validate()
    await newReviewImage.save()
    const response = await ReviewImage.findByPk(newReviewImage.id, {
        attributes: ['id', 'url']
    })
    res.json(response)
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const findId = req.params.reviewId
    const updateReview = await Review.findByPk(findId)
    const { id, userId, spotId, review, stars, } = req.body
    if (!updateReview) {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== updateReview.userId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }
    if (review == '' || parseInt(stars) < 0 || parseInt(stars) > 5) {
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    }
    const update = await updateReview.update({
        id, userId, spotId, review, stars
    })
    res.json(update)
})


router.delete('/:reviewId', requireAuth, async (req, res) => {
    const findId = req.params.reviewId
    const deleteReview = await Review.findByPk(findId)
    if (!deleteReview) {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    await deleteReview.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})




module.exports = router;
