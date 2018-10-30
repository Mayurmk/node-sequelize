const express = require('express');
const brandController = require('../controller/index').brand;
const Joi = require('joi');
const validate = require('express-validation');
const router = express.Router();

const paramValidation = {
    insertBrand: {
        body: {
            brand_name: Joi.string()
        }
    },
    updateBrand: {
        body: {
            brand_name: Joi.string()
        },
        params: {
            id: Joi.number(),
            index: Joi.number(),
            size: Joi.number(),
            field: Joi.string(),
            direction: Joi.string()
        }
    }
};

router.route('/')
// GET /api/brand ALL THE BRAND TABLE RECORDS.
    .get(brandController.getAll);

router.route('/')
// POST /api/brand ADD THE BRAND RECORD.
    .post(validate(paramValidation.insertBrand), brandController.create);

router.route('/:index/:size/:direction/:field')
    // GET /api/brand/:index/:size/:direction/:field Page wise brand data
    .get(validate(paramValidation.updateBrand), brandController.getBrandPageWise);

router.route('/:id')

// PUT API for Edit the brand Table Data.
    .put(validate(paramValidation.updateBrand), brandController.update)

// GET specific brand by ID.
    .get(validate(paramValidation.updateBrand), brandController.getById)

// DELETE /api/brand/:id Delete specific brand By Id.
    .delete(validate(paramValidation.updateBrand), brandController.deleteBrand);

module.exports = router;
