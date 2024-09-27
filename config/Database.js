import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('jba_journal', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Export the Sequelize instance
export default sequelize;
