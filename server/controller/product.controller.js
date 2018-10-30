const db = require('../models/index');
const product = db.Product;
const brand = db.Brand;
const category = db.Category;
product.belongsTo(brand, {foreignKey: 'brand_id', sourceKey: 'id'});
product.belongsTo(category, {foreignKey: 'category_id', sourceKey: 'id'});

const APIError = require('../helper/APIError');
const httpStatus = require('http-status');

module.exports = {
    create(req, res, next) {
        return product.create({
            category_id: req.body.category_id,
            brand_id: req.body.brand_id,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_qty: req.body.product_qty,
            product_price: req.body.product_price,
            product_images: req.file.filename,
            isDeleted: req.body.isDeleted,
            issoldout: req.body.issoldout,
            isFeatureProduct: req.body.isFeatureProduct
        })
            .then((result) => {
                if (result !== null) {
                    res.status(200).send({
                        Status: 'Added Successfully'
                    });
                }
            })
            .catch(() => {
                return Promise.reject(new APIError('No proper Data', httpStatus.NOT_FOUND, true))
            })
    },
    getAll(req, res) {
        return product.findAll({
            where: {
                isDeleted: 0
            },
            include: [
                {
                    model: brand,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                {
                    model: category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            ]
        })
            .then((result) => {
                if (result === null) {
                    return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
                }
                res.status(200).send(result);
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
    },
    updateProduct(req, res) {
        return product.update({
            category_id: req.body.category_id,
            brand_id: req.body.brand_id,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_qty: req.body.product_qty,
            product_price: req.body.product_price,
            product_images: req.file.filename,
            isDeleted: req.body.isDeleted,
            issoldout: req.body.issoldout,
            isFeatureProduct: req.body.isFeatureProduct
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send({
                        Status: 'Updated Successfully'
                    });
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            });
    },
    deleteProduct(req, res) {
        return product.update({
            isDeleted: 1
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    res.status(200).send({
                        Status: 'Deleted Successfully'
                    });
                }
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            });
    },
    getById(req, res, next) {
        return product.findOne({
            where: {
                id: req.params.id,
                isDeleted: 0
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: brand,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send(result);
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                const err = new APIError('No Data Found', httpStatus.NOT_FOUND, true);
                return next(err);
            })
    },
    getDataPageWise(req, res) {
        if (req.params.direction === 'reset' && req.params.field === 'reset') {
            return product.findAndCountAll({
                offset: req.params.index,
                limit: req.params.size,
                where: {
                    isDeleted: 0
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: brand,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: category,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }
                ]
            })
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch(() => {
                    return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
                });
        } else {
            return product.findAndCountAll({
                offset: req.params.index,
                limit: req.params.size,
                where: {
                    isDeleted: 0
                },
                order: [
                    [req.params.field, req.params.direction],
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: brand,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: category,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }
                ]
            })
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch(() => {
                    return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
                });
        }
    },
    getRandomData(req, res) {
        return product.findAll({
            where: {
                isDeleted: 0,
                isFeatureProduct: 1
            },
            limit: req.params.limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: brand,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
    }
};