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

// Initialize database connection
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! Express server is running.');
});

// Start the server if running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const startServer = async () => {
    try {
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Server startup failed:', error.message);
      process.exit(1);
    }
  };
  startServer();
}

// CRITICAL: Export for Vercel's serverless functions
module.exports = app;
