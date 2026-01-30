/**
 * Settings routes
 */

import { Router } from 'express';
import * as settingsController from '../controllers/settingsController.js';

export function settingsRouter() {
  const router = Router();
  router.get('/', settingsController.getSettings);
  router.patch('/', settingsController.updateSettings);
  return router;
}
