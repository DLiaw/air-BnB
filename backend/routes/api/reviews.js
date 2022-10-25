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
    const review = await Review.findAll({
        where: { id: currentId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: ReviewImage, attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] } }
        ]
    })

    res.json(review)
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
    res.json(newReviewImage)
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const id = req.params.reviewId
    const reviewId = await Review.findByPk(id)
    if (!reviewId) {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== reviewId.userId) {
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

})

module.exports = router;
