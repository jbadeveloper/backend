import express from 'express';
import { addJournal, getJournalsByEmployeeID, getJournalById, updateJournal, deleteJournal } from '../controllers/JournalController.js';

const router = express.Router();

router.post('/journal', addJournal);
router.get('/journal/:employeeID', getJournalsByEmployeeID);
router.get('/journal/:journalID', getJournalById);
router.put('/journal/:journalID', updateJournal); // Pastikan rute ini ada
router.delete('/journal/:journalID', deleteJournal);


export default router;
