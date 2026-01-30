/**
 * Transactions routes
 */

import { Router } from 'express';
import * as transactionController from '../controllers/transactionController.js';

export function transactionsRouter(db) {
  const router = Router();
  router.get('/', (req, res) => transactionController.getTransactions(req, res, db));
  router.post('/', (req, res) => transactionController.createTransaction(req, res, db));
  return router;
}
