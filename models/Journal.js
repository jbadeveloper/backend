import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
import Employee from './Employee.js';

const Journal = sequelize.define('journal', {
  journalID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee, // Assuming 'Employee' is the table name
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
  evaluation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  
});

Employee.hasMany(Journal, { foreignKey: 'employeeID' });
Journal.belongsTo(Employee, { foreignKey: 'employeeID' });

export default Journal;
