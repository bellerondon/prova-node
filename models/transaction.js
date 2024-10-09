const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users', 
                key: 'id'
            },
            allowNull: false
        },
        totalAmount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'pending'
        }
    });
    
    return Transaction;
};
