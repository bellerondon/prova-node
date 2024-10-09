var express = require('express');
var router = express.Router();

// Carregando as dependências
const db = require('../models'); // Carregando o banco de dados

// Carregando as classes de serviço e controlador para transações
const TransactionService = require('../services/transactionService');
const TransactionController = require('../controllers/transactionController');

// Construindo os objetos a partir das classes
const transactionService = new TransactionService(db.Transaction);
const transactionController = new TransactionController(transactionService);

/* GET transactions listing. */
router.get('/', function(req, res, next) {
  res.send('Transaction module is running.');
});

// Route to process payment with credit card
router.post('/creditcard', async (req, res) => {
  transactionController.pagamentoCartao(req, res);
});

// Route to process payment via PIX
router.post('/pix', async (req, res) => {
  transactionController.pagamentoPix(req, res);
});

// Route to check the status of a transaction by ID
router.get('/status/:id', async (req, res) => {
  transactionController.consultarStatus(req, res);
});

module.exports = router;
