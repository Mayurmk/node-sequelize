const express = require('express');
const validate = require('express-validation');
const Joi = require('joi');
const userController = require('../controller/user.controller');

const router = express.Router();

const paramValidation = {
    updateUser: {
        body: {
            email: Joi.string().email().required(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            gender: Joi.string(),
            phone_no: Joi.string(),
            address: Joi.string()
        },
        params: {
            id: Joi.string().required(),
        },
    },
};

router.route('/')
    // GET /api/users. all the users.
    .get(userController.getAll);

router.route('/profile')
// GET /api/users/profile. all the users.
    .get(userController.getProfile);

router.route('/:id')
    // GET /api/users/:userId. all the users.
    .get(validate(paramValidation.updateUser), userController.getById)
    .put(validate(paramValidation.updateUser), userController.update)
    .delete(validate(paramValidation.updateUser), userController.deleteUser);

module.exports = router;