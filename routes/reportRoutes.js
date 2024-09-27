import express from 'express';
import { generateReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/generate/:employeeID', generateReport);

export default router;
