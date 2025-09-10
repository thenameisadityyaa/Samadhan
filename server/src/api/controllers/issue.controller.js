// src/api/controllers/issue.controller.js

// Mock in-memory database
const reportsStore = [];

// Function to CREATE a new issue
const createIssue = async (req, res) => {
  try {
    console.log('Received data to create issue:', req.body);

    const {
      issueType,
      description,
      location,
      coordinates,
      urgency,
      contactInfo,
      photosCount,
      userEmail,
    } = req.body || {};

    if (!issueType || !description) {
      return res.status(400).json({ message: 'issueType and description are required' });
    }

    const newReport = {
      _id: Date.now().toString(), // Create a fake ID
      issueType,
      description,
      location: location || null,
      coordinates: coordinates || null,
      urgency: urgency || 'medium',
      contactInfo: contactInfo || null,
      photosCount: typeof photosCount === 'number' ? photosCount : 0,
      userEmail: userEmail || (contactInfo && contactInfo.email) || null,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    reportsStore.push(newReport); // "Save" to our temporary array

    res.status(201).json({
      message: 'Report received (mocked)!',
      data: newReport,
    });
  } catch (err) {
    console.error('Error creating issue:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
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