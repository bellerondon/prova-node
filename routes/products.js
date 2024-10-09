var express = require('express');
var router = express.Router();


const db = require('../models');


const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');


const productService = new ProductService(db.Product);
const productController = new ProductController(productService);


router.post('/newproduct', async (req, res) => {
  productController.createProduct(req, res);
});


router.get('/allproducts', async (req, res) => {
  productController.listProducts(req, res);
});


router.put('/updateproduct/:id', async (req, res) => {
  productController.updateProduct(req, res);
});


router.delete('/deleteproduct/:id', async (req, res) => {
  productController.deleteProduct(req, res);
});

module.exports = router;
