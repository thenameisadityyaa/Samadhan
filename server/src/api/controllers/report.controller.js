const Report = require('../../models/Report');

// POST /api/reports
exports.createReport = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user && req.user.id;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    // For now, create reports without user authentication
    // TODO: Add proper user authentication later
    const report = await Report.create({
      title: title.trim(),
      description: description.trim(),
      submittedBy: userId || null, // Allow null for anonymous reports
    });

    return res.status(201).json({ success: true, data: report });
  } catch (err) {
    console.error('createReport error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// GET /api/reports
exports.getAllReports = async (_req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: reports });
  } catch (err) {
    console.error('getAllReports error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


