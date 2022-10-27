// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Sequelize } = require("sequelize");
const { raw } = require('express');



router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const deleteImage = await SpotImage.findByPk(imageId, {
        include: [{ model: Spot }]
    })

    if (!deleteImage) {
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }

    if (deleteImage.Spot.ownerId == req.user.id) {
        await deleteImage.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})






module.exports = router;
