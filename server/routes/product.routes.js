const express = require('express');
const Joi = require('joi');
const validate = require('express-validation');
const router = express.Router();
const productController = require('../controller/product.controller');
const upload = require('../config/upload.config');

const paramsValidation = {
    insertData: {
        body: {
            category_id: Joi.number(),
            brand_id: Joi.number(),
            product_name: Joi.string(),
            product_description: Joi.string(),
            product_qty: Joi.number(),
            product_price: Joi.number(),
            product_images: Joi.string(),
            isDeleted: Joi.number(),
            issoldout: Joi.string(),
            isFeatureProduct: Joi.number()
        },
        file: {
            product_images: Joi.string()
        }
    },
    updateData: {
        body: {
            category_id: Joi.number(),
            brand_id: Joi.number(),
            product_name: Joi.string(),
            product_description: Joi.string(),
            product_qty: Joi.number(),
            product_price: Joi.number(),
            product_images: Joi.string(),
            isDeleted: Joi.number(),
            issoldout: Joi.string(),
            isFeatureProduct: Joi.number()
        },
        params: {
            id: Joi.number(),
            index: Joi.number(),
            size: Joi.number(),
            direction: Joi.string(),
            field: Joi.string(),
            value: Joi.string(),
            limit: Joi.number()
        },
        file: {
            product_images: Joi.string()
        }
    },
    params: {
        id: Joi.number()
    }
};

router.route('/')
// POST /api/product Add all the products.
    .post(validate(paramsValidation.insertData), upload.single('product_images'), productController.create);

router.route('/')
// GET /api/product Get all the products.
    .get(productController.getAll);

router.route('/:value/:limit')
// GET /api/product/:value(rand)/:limit
    .get(validate(paramsValidation.updateData), productController.getRandomData);

router.route('/:id')
// PUT /api/product/:id Update a specific product.
    .put(validate(paramsValidation.updateData), upload.single('product_images'), productController.updateProduct)

// DELETE /api/product/:id DELETE a specific product.
    .delete(validate(paramsValidation.params), productController.deleteProduct)

// GET /api/product/:id Get Product By ID.
    .get(validate(paramsValidation.params), productController.getById);

router.route('/:index/:size/:direction/:field')
// GET /api/product/:index/:size/:direction/:field pagination wise data.
    .get(validate(paramsValidation.updateData), productController.getDataPageWise);

module.exports = router;