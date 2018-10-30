'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tblproducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'tblcategories',
                    key: 'id',
                    as: 'category_id'
                },
                allowNull: false
            },
            brand_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'tblbrands',
                    key: 'id',
                    as: 'brand_id'
                },
                allowNull: false
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product_description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            product_qty: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            product_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            product_images: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            isDeleted: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            issoldout: {
                type: Sequelize.ENUM(['true', 'false']),
                allowNull: false,
                defaultValue: 'false'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tblproducts');
    }
};