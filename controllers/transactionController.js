// ./controllers/transactionController.js
const { TransactionService } = require('../services/transactionService');

class TransactionController {
    constructor(TransactionService) {
        this.transactionService = TransactionService;
    }

    async paymentCard(req, res) {
        const { usuarioId, valorTotal } = req.body;
        try {
            const newTransaction = await this.transactionService.paymentCard(usuarioId, valorTotal);
            return res.status(201).json(newTransaction);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao processar pagamento com cartão de crédito' });
        }
    }

    async paymentPix(req, res) {
        const { usuarioId, valorTotal } = req.body;
        try {
            const newTransaction = await this.transactionService.paymentPix(usuarioId, valorTotal);
            return res.status(201).json(newTransaction);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao processar pagamento via PIX' });
        }
    }

    async checkStatus(req, res) {
        const { id } = req.params;
        try {
            const transaction = await this.transactionService.checkStatus(id);
            if (!transaction) {
                return res.status(404).json({ error: 'Transação não encontrada' });
            }
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao consultar status da transação' });
        }
    }
}

module.exports = TransactionController;
