'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tblusermasters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING(25),
                allowNull: true,
            },
            last_name: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            gender: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            phone_no: {
                type: Sequelize.STRING(13),
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role_name: {
                type: Sequelize.ENUM('User', 'Admin'),
                defaultValue: 'User',
                allowNull: true,
            },
            isDeleted: {
                type: Sequelize.INTEGER(1),
                defaultValue: 0
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
        return queryInterface.dropTable('tblusermasters');
    }
};