const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const authController = require('../auth/auth.controller');

const router = express.Router();

const paramValidation = {
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    },
    registerUser: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone_no: Joi.string(),
            role_name: Joi.string()
        }
    }
};

router.route('/login')
// POST /api/auth/login To LOGIN into the system.
    .post(validate(paramValidation.login), authController.login);

router.route('/register')
// POST /api/auth/register To Register in the system.
    .post(validate(paramValidation.registerUser), authController.register);

module.exports = router;