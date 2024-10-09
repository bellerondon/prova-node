const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cartId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Carts', 
                key: 'id'
            },
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Products', 
                key: 'id'
            },
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });

    return CartItem;  // Certifique-se de retornar o modelo corretamente
};
