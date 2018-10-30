'use strict';

module.exports = (sequelize, DataTypes) => {
    const tblproduct = sequelize.define('tblproduct', {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        product_qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_images: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        issoldout: {
            type: DataTypes.ENUM(['true', 'false']),
            allowNull: false,
            defaultValue: 'false'
        },
        isFeatureProduct: {
            type: DataTypes.ENUM(['0', '1']),
            allowNull: false,
            defaultValue: 0
        }
    }, {});
    tblproduct.associate = function (models) {
        // associations can be defined here
    };

    // tblproduct.belongsTo(tblbrand,{foreignKey:'brand_id'})
    // tblproduct.belongsTo(tblcategory,{foreignKey:'category_id'})
    return tblproduct;
};