// backend/routes/index.js
const express = require('express');
const router = express.Router();
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models')

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});
// ...

// backend/routes/index.js
// ...
const apiRouter = require('./api');

router.use('/api', apiRouter);
// ...





module.exports = router;
