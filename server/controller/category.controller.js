const db = require('../models/index');
const category = db.Category;
const APIError = require('../helper/APIError');
const httpStatus = require('http-status');
module.exports = {
    create(req, res) {
        return category.create({
            category_name: req.body.category_name
        })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(() => {
                return Promise.reject(new APIError('No proper Data', httpStatus.NOT_FOUND, true));
            });
    },
    getAll(req, res) {
        return category.findAll({
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
    },
    getById(req, res, next) {
        return category.findOne({
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
            });
    },
    update(req, res) {
        return category.update({
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send('Updated succesfully');
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            });
    },

    deleteCategory(req, res) {
        return category.update({
            isDeleted: 1
        }, {
            where: {
                id: req.params.id,
                isDeleted: 0
            }
        })
            .then((result) => {
                if (result !== null) {
                    return res.status(200).send('Deleted succesfully');
                }
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            })
            .catch(() => {
                return Promise.reject(new APIError('No Data Found', httpStatus.NOT_FOUND, true));
            });
    },
    getDataPageWise(req, res) {
        if (req.params.direction === 'reset' && req.params.field === 'reset') {
            return category.findAndCountAll({
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
            return category.findAndCountAll({
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