import express from 'express';
import * as searchController from './searchController';

export const prefix = '/portfolio';

// portfolio Routes
const router = express.Router();
router.get('/search', searchController.readList);

export default router;
