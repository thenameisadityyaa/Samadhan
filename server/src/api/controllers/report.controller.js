const Report = require('../../models/Report');
const { uploadToCloudinary } = require('../../utils/cloudinary');

// POST /api/reports
exports.createReport = async (req, res) => {
  try {
    const { title, description, location, urgency, category } = req.body;
    let parsedCoordinates = { lat: 0, lng: 0 };
    if (req.body.coordinates) {
      try {
        parsedCoordinates = JSON.parse(req.body.coordinates);
      } catch (err) {}
    }
    
    const userId = req.user && req.user.id;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Upload photos sequentially to Cloudinary (if any via multer)
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, 'samadhan_reports');
          imageUrls.push(result.secure_url);
        } catch (uploadErr) {
          console.error("Cloudinary upload error: ", uploadErr);
        }
      }
    }

    const report = await Report.create({
      title: title.trim(),
      description: description.trim(),
      location: location || '',
      coordinates: parsedCoordinates,
      urgency: urgency || 'medium',
      category: category || '',
      images: imageUrls,
      submittedBy: userId,
    });

    return res.status(201).json({ success: true, data: report });
  } catch (err) {
    console.error('createReport error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /api/reports/:id/status
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Submitted', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('submittedBy', 'name email');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // TODO: Trigger email notification here
    const { sendStatusEmail } = require('../../utils/mailer');
    if (report.submittedBy && report.submittedBy.email) {
      sendStatusEmail(report.submittedBy.email, report.title, status);
    }

    return res.status(200).json({ success: true, data: report });
  } catch (err) {
    console.error('updateReportStatus error:', err.message);
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
// GET /api/reports/my  — citizen: own reports only
exports.getMyReports = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const reports = await Report.find({ submittedBy: userId }).sort({ createdAt: -1 });

    const total      = reports.length;
    const pending    = reports.filter(r => r.status === 'Submitted').length;
    const inProgress = reports.filter(r => r.status === 'In Progress').length;
    const resolved   = reports.filter(r => r.status === 'Resolved').length;

    return res.status(200).json({
      success: true,
      data: {
        reports,
        stats: { total, pending, inProgress, resolved },
      },
    });
  } catch (err) {
    console.error('getMyReports error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
