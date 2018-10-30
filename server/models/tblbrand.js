'use strict';
module.exports = (sequelize, DataTypes) => {
    const tblbrand = sequelize.define('tblbrand', {
        brand_name: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
    }, {});
    tblbrand.associate = function (models) {
        // associations can be defined here
        tblbrand.hasMany(models.tblproduct, {foreignKey: 'brand_id', sourceKey: 'id'});
    };
    return tblbrand;
};