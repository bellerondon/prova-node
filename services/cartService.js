const db = require('../models');

class CartService {
    constructor(CartModel, CartItemModel) {
        this.Cart = CartModel;
        this.CartItem = CartItemModel;
    }

    async addToCart(userId, { productId, quantity }) {
        try {
            console.log("")
            
            // Encontra ou cria um carrinho para o usuário
            const [cart] = await this.Cart.findOrCreate({ where: { userId } });
            
            console.log(cart);
            // Verifica se o item já está no carrinho
            let cartItem = await this.CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId
                }
            });

            if (cartItem) {
                // Se o item já existe, apenas atualiza a quantidade
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                // Se não existe, cria um novo item no carrinho
                cartItem = await this.CartItem.create({
                    cartId: cart.id,
                    productId,
                    quantity
                });
            }

            return cart; 
        } catch (error) {
            throw error; 
        }
    }

    async removeFromCart(userId, itemId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                return null;
            }

           
            const itemRemoved = await this.CartItem.destroy({ where: { id: itemId, cartId: cart.id } });
            return itemRemoved > 0 ? cart : null; 
        } catch (error) {
            throw error;
        }
    }

    async viewCart(userId) {
        try {
            const cart = await this.Cart.findOne({
                where: { userId },
                include: [this.CartItem] 
            });
            return cart ? cart : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;
