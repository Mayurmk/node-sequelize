const express = require('express');
const categoryController = require('../controller/index').category;
const Joi = require('joi');
const validate = require('express-validation');
const router = express.Router();

const paramsValidation = {
    insertCategory: {
        body: {
            category_name: Joi.string()
        }
    },
    updateCategory: {
        body: {
            category_name: Joi.string()
        },
        params: {
            id: Joi.number(),
            index: Joi.number(),
            size: Joi.number(),
            direction: Joi.string(),
            field: Joi.string()
        }
    }
};

router.route('/')
// POST /api/category a new Category Record.
    .post(validate(paramsValidation.insertCategory), categoryController.create)

// Get /api/category - all the Category Record.
    .get(categoryController.getAll);

router.route('/:id')
// Get /api/category/:id  Fetch Specific Category.
    .get(validate(paramsValidation.updateCategory), categoryController.getById)

// PUT /api/category/:id Update specific Category.
    .put(validate(paramsValidation.updateCategory), categoryController.update)

// DELETE /api/category/:id Delete specific Catgeory(SOFT DELETE)
    .delete(validate(paramsValidation.updateCategory), categoryController.deleteCategory);

router.route('/:index/:size/:direction/:field')
// GET /api/category/:index/:size/:direction/:field
    .get(validate(paramsValidation.updateCategory), categoryController.getDataPageWise);
module.exports = router;