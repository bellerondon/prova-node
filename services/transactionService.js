const db = require('../models');

class TransactionService {
    constructor(TransactionModel) {
        this.Transaction = TransactionModel;
    }

    async createTransaction(usuarioId, valorTotal, metodoPagamento) {
        try {
            const newTransaction = await this.Transaction.create({
                usuarioId: usuarioId,
                valorTotal: valorTotal,
                metodoPagamento: metodoPagamento,
                status: 'pendente'
            });
            return newTransaction ? newTransaction : null;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const transaction = await this.Transaction.findByPk(id);
            return transaction ? transaction : null;
        } catch (error) {
            throw error;
        }
    }

    async updateTransactionStatus(id, status) {
        try {
            const transaction = await this.Transaction.findByPk(id);
            if (!transaction) {
                return null;
            }
            transaction.status = status;
            await transaction.save();
            return transaction;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService;
