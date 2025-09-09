// src/api/routes/issue.routes.js
const express = require('express');
const { createIssue, getIssues } = require('../controllers/issue.controller.js');
    
const router = express.Router();

// Route to create a new issue
router.post('/issues', createIssue);

// Route to get all issues
router.get('/issues', getIssues);

module.exports = router;