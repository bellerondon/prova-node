const CartService = require('../services/cartService');

class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    async addToCart(req, res) {
        const { userId, productId, quantity } = req.body; 
        try {
            const updatedCart = await this.cartService.addToCart(userId, { productId, quantity }); 
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ error: 'Erro ao adicionar produto à cesta' });
        }
    }

    async removeFromCart(req, res) {
        const { itemId } = req.params; 
        const { userId } = req.body;

        try {
            const updatedCart = await this.cartService.removeFromCart(userId, itemId); 
            if (!updatedCart) {
                return res.status(404).json({ error: 'Produto não encontrado na cesta' });
            }
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover produto da cesta' });
        }
    }

    async viewCart(req, res) {
        const { userId } = req.body; 
        try {
            const cart = await this.cartService.viewCart(userId);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao visualizar cesta' });
        }
    }
}

module.exports = CartController;
