// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const connectDB = require('./config/db.js'); // REMOVED

const issueRoutes = require('./api/routes/issue.routes.js');

// connectDB(); // REMOVED

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', issueRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});