const { ProductService } = require('../services/productService');

class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    async createProduct(req, res) {
        const { name, description, price, stock } = req.body;
        try {
            const newProduct = await this.productService.create(name, description, price, stock);
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    async listProducts(req, res) {
        try {
            const products = await this.productService.findAll();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        try {
            const updatedProduct = await this.productService.update(id, name, description, price, stock);
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const deletedProduct = await this.productService.delete(id);
            return res.status(204).json(deletedProduct);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;
