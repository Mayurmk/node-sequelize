const db = require('../models/index');
const brand = db.Brand;
const product = db.Product;
brand.hasMany(product, { foreignKey: 'brand_id', sourceKey: 'id'});
const APIError = require('../helper/APIError');
const httpStatus = require('http-status');

module.exports = {
    create(req, res) {
        return brand.create({
            brand_name: req.body.brand_name
        })
            .then(() => {
                res.status(201).send({
                    Status: 'Added Successfully'
                })
            })
            .catch(() => {
                return Promise.reject(new APIError('No Proper Data', httpStatus.BAD_REQUEST, true))
            })
    },
    getAll(req, res) {
        return brand.findAll({
            where: {
                isDeleted: 0
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: product
            }]
        })
            .then((brand) => {
                res.send(brand)
            })
            .catch(() => {
                return Promise.reject(new APIError('No Such Data', httpStatus.NO_CONTENT, true))
            })
    },
    update(req, res) {
        return brand.update({
            brand_name: req.body.brand_name
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send({
                        Status: 'Updated succesfully'
                    });
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                return Promise.reject(new APIError('No Such Data', httpStatus.NOT_FOUND, true))
            })
    },
    getById(req, res, next) {
        return brand.findOne({
            where: {
                id: req.params.id,
                isDeleted: 0
            }
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
    deleteBrand(req, res) {
        return brand.update({
            isDeleted: 1
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send({
                        Status: 'Deleted succesfully'
                    });
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
    },
    getBrandPageWise(req, res) {
        if (req.params.direction === 'reset' && req.params.field === 'reset') {
            return brand.findAndCountAll({
                offset: req.params.index,
                limit: req.params.size,
                where: {
                    isDeleted: 0
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch(() => {
                    return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
                });
        } else {
            return brand.findAndCountAll({
                offset: req.params.index,
                limit: req.params.size,
                where: {
                    isDeleted: 0
                },
                order: [
                    [req.params.field, req.params.direction]
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch(() => {
                    return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
                });
        }

    }
};