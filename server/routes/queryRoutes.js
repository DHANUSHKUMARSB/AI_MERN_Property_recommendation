import express from 'express';
import { queryProperties } from '../controllers/queryController.js';

const router = express.Router();

router.post('/', queryProperties);

export default router;
