import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const Todo = sequelize.define('todo', {
  todoID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employee', // Assuming 'Employee' is the table name
      key: 'employeeID',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

export default Todo;
