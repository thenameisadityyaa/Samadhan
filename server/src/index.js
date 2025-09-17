const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js'); // <-- 1. IMPORT THE DB CONNECTION

// const issueRoutes = require('./api/routes/issue.routes.js'); // Not used
const authRoutes = require('./api/routes/auth.routes.js');
const reportRoutes = require('./api/routes/report.routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// CONNECT TO DATABASE AND START SERVER
async function startServer() {
  try {
    await connectDB(); // Wait for database connection
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();