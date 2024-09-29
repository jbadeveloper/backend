// backend/models/Employee.js
import { Sequelize } from 'sequelize';
import sequelize from '../config/Database.js';

const { DataTypes } = Sequelize;

const Employee = sequelize.define('employee', {
  employeeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  office: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});

export default Employee;
