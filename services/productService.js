const db = require('../models');

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    async create(name, description, price, stock) {
        try {
            const newProduct = await this.Product.create({
                name: name,
                description: description,
                price: price,
                stock: stock
            });
            return newProduct ? newProduct : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const products = await this.Product.findAll();
            return products ? products : null;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const product = await this.Product.findByPk(id);
            return product ? product : null;
        } catch (error) {
            throw error;
        }
    }

    async update(id, name, description, price, stock) {
        try {
            const product = await this.Product.findByPk(id);
            if (!product) {
                return null;
            }
            product.name = name;
            product.description = description;
            product.price = price;
            product.stock = stock;
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const product = await this.Product.findByPk(id);
        if (!product) {
            throw new Error("produto não encontrado");
        }
        await product.destroy();
        return ("deu certo");
        
    }
}

module.exports = ProductService;
