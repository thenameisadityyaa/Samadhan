// src/api/controllers/issue.controller.js

// Mock in-memory database
const reportsStore = [];

// Function to CREATE a new issue
const createIssue = async (req, res) => {
  console.log('Received data to create issue:', req.body);

  const newReport = {
    _id: Date.now().toString(), // Create a fake ID
    issueType: req.body.issueType,
    description: req.body.description,
    status: 'New',
    submittedAt: new Date().toISOString(),
  };

  reportsStore.push(newReport); // "Save" to our temporary array

  res.status(201).json({
    message: 'Report received (mocked)!',
    data: newReport,
  });
};

// Function to GET all issues
const getIssues = async (req, res) => {
  console.log('Fetching all issues (mocked)...');
  res.status(200).json({
    message: 'Issues fetched successfully (mocked)!',
    data: reportsStore.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)), // Newest first
  });
};

module.exports = {
  createIssue,
  getIssues,
};