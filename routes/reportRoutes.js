import express from 'express';
import { generateReport } from '../controllers/ReportController.js';

const router = express.Router();

router.get('/generate/:employeeID', generateReport);

export default router;
