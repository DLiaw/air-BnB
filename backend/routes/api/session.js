// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// backend/routes/api/session.js
// ...

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid password.'),
    handleValidationErrors

];
// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });
        if (!user) {

            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ["Invalid credentials"];
            // return res.json({
            //     // message: 'Login failed.',
            //     // statusCode: err.status,
            //     // errors: err.errors
            // });
            return next(err)
        }

        if (credential == '' || password == '') {
            res.status = 400
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: [
                    "Email or username is required",
                    "Password is required"
                ]
            })
        }
        await setTokenCookie(res, user);

        // user['token'] = tokens
        // delete user.createdAt
        // delete user.updatedAt
        // let { id, firstName, lastName, email, username } = user

        return res.json(
            // id, firstName, lastName, email, username, token
            user
        );
    }
);

// backend/routes/api/session.js
// ...

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// ...
// backend/routes/api/session.js
// ...

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            // const { id, firstName, lastName, email, username } = user
            return res.json({
                user
            });
        } else return res.json({ user: null });
    }
);

// ...











module.exports = router;
