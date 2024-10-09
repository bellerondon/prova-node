const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Product.associate = (models) => {
        Product.belongsToMany(models.Cart, {
            through: "CartItem",
            foreignKey: "productId",
            as: "carts",
            onDelete: "CASCADE",  // Deleção em cascata
            hooks: true 
        });
    };

    return Product;
};
