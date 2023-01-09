// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js');
const reviewRouter = require('./reviews.js')
const bookingRouter = require('./bookings.js')
const spotImageRouter = require('./spot-images.js')
const reviewImageRouter = require('./review-images.js')
router.use(restoreUser);
router.use('/review-images', reviewImageRouter)
router.use('/spot-images', spotImageRouter)
router.use('/bookings', bookingRouter)
router.use('/spots', spotRouter);
router.use('/session', sessionRouter);
router.use('/reviews', reviewRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
