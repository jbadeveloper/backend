// backend/controllers/EmployeeController.js
import Employee from '../models/Employee.js';

// Tambah Karyawan Baru
export const addEmployee = async (req, res) => {
  const { name, position, office } = req.body;
  try {
    const newEmployee = await Employee.create({ name, position, office });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tampilkan Semua Karyawan
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tampilkan Karyawan berdasarkan ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Data Karyawan
export const updateEmployee = async (req, res) => {
  const { name, position, office } = req.body;
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.name = name;
    employee.position = position;
    employee.office = office;
    await employee.save();
    
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hapus Karyawan
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    
    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
