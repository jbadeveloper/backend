import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
});

export default Users;
