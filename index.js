// backend/index.js
import express from 'express';
import cors from 'cors';
import sequelize from './config/Database.js';
import EmployeeRoutes from './routes/employeeRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:5173', // Frontend URL
    credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use(EmployeeRoutes);
app.use('/api', journalRoutes);
app.use('/api', todoRoutes);
app.use('/api/report', reportRoutes);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Sinkronisasi tabel
sequelize.sync({ alter: true }) // Menggunakan alter untuk memperbarui skema yang ada
  .then(() => {
    console.log('Database & tables created or updated');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });