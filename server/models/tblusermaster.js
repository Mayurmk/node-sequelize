'use strict';
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    const tblusermaster = sequelize.define('tblusermaster', {
        first_name: {
            type: DataTypes.STRING(25),
            allowNull: true,

        },
        last_name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        phone_no: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_name: {
            type: DataTypes.ENUM(['User', 'Admin']),
            allowNull: false,
            defaultValue: 'User'
        },
        isDeleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        }
    }, {});
    tblusermaster.associate = function (models) {
        // associations can be defined here
    };

    tblusermaster.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    tblusermaster.prototype.safeModel = function() {
        return _.omit(this.toJSON(), ['password']);
    };

    return tblusermaster;
};