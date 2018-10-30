'use strict'
module.exports = (sequelize, DataTypes) => {
    const tblcategory = sequelize.define('tblcategory', {
        category_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
    }, {});
    tblcategory.associate = function (models) {
        // associations can be defined here
        tblcategory.hasMany(models.tblproduct, {foreignKey: 'category_id', sourceKey: 'id'});
    };
    return tblcategory
};