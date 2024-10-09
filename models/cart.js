const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
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
        }
    });

    Cart.associate = (models) => {
        Cart.belongsToMany(models.Product, {
            through: "CartItem",
            foreignKey: "cartId",
            as: "products",
            onDelete: "CASCADE",  
            hooks: true 
        });
    };

    return Cart;
};
