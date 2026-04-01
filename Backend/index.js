require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/mongoDB');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors());

const UserRoutes = require('./src/Routes/UserRoutes');
const IncomeRoutes = require('./src/Routes/IncomeRoutes');
const ExpenseRoutes = require('./src/Routes/ExpenseRoutes');
const DashboardRoutes = require('./src/Routes/DashboardRoutes');
const { authenticateToken } = require('./src/middleware/authMiddleware');

app.use('/api/user', UserRoutes);
app.use('/api/income', authenticateToken, IncomeRoutes);
app.use('/api/expense', authenticateToken, ExpenseRoutes);
app.use('/api/dashboard', DashboardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! Express server is running.');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
