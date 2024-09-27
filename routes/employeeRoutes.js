// backend/routes/EmployeeRoutes.js
import express from 'express';
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/EmployeeController.js';

const router = express.Router();

router.post('/employees', addEmployee); // Tambah Karyawan
router.get('/employees', getEmployees); // Lihat Semua Karyawan
router.get('/employees/:id', getEmployeeById); // Lihat Karyawan Berdasarkan ID
router.put('/employees/:id', updateEmployee); // Update Karyawan
router.delete('/employees/:id', deleteEmployee); // Hapus Karyawan

export default router;
