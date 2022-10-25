// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// backend/routes/api/users.js
// ...
const validateSignup = [
    check('firstName')
        .exists({ checkFasly: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a last name.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;

        let userName = await User.findOne({
            where: { username }
        })

        if (userName) {
            res.json({
                statusCode: 403,
                message: 'User name exists.',
            })
        }

        let userEmail = await User.findOne({
            where: { email }
        })

        if (userEmail) {
            res.json({
                statusCode: 403,
                message: 'Email already exist.'
            })
        }
        const user = await User.signup({ firstName, lastName, email, username, password });

        const token = await setTokenCookie(res, user);

        return res.json({
            user,
            token
        });
    }
);














module.exports = router;