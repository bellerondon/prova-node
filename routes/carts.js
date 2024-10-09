var express = require('express');
var router = express.Router();


const db = require('../models'); 


const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');


const cartService = new CartService(db.Cart, db.CartItem); 
const cartController = new CartController(cartService);


router.post('/add', async (req, res) => {
  await cartController.addToCart(req, res);
});


router.delete('/remove/:itemId', async (req, res) => {
  await cartController.removeFromCart(req, res);
});


router.get('/', async (req, res) => {
  await cartController.viewCart(req, res);
});

module.exports = router;
