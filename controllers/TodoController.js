import Todo from '../models/Todo.js';

// Tambah Jurnal Baru
export const addTodo = async (req, res) => {
    try {
        const { employeeID, date, description, status } = req.body;

        if (!employeeID || !date || !description || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const todo = await Todo.create({
            employeeID,
            date,
            description,
            status
        });

        res.status(201).json(todo);
    } catch (error) {
        console.error('Error adding journal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Tampilkan Semua Jurnal Berdasarkan employeeID
// controllers/journalController.js

export const getTodoByEmployeeID = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const todo = await Todo.findAll({ where: { employeeID } });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Tampilkan Jurnal Berdasarkan journalID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller untuk update todo
export const updateTodo = async (req, res) => {
    try {
        const { todoID } = req.params;
        const { date, description, status } = req.body;

        const todo = await Todo.findByPk(todoID);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.date = date;
        todo.description = description;
        todo.status = status;

        await todo.save();

        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Hapus Jurnal
export const deleteTodo = async (req, res) => {
  const { todoID } = req.params;
  try {
      const deletedTodo = await Todo.destroy({ where: { todoID } });
      if (deletedTodo) {
          res.status(200).json({ message: 'ToDo deleted successfully' });
      } else {
          res.status(404).json({ message: 'ToDo not found' });
      }
  } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};