import express from 'express';
import { addTodo, getTodoByEmployeeID, getTodoById, updateTodo, deleteTodo } from '../controllers/TodoController.js';

const router = express.Router();

router.post('/todo', addTodo);
router.get('/todo/:employeeID', getTodoByEmployeeID);
router.get('/todo/:todoID', getTodoById);
router.put('/todo/:todoID', updateTodo); // Pastikan rute ini ada
router.delete('/todo/:todoID', deleteTodo);

export default router;
