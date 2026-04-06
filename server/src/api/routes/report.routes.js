const express = require('express');
const { protect, adminProtect } = require('../../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { createReport, getAllReports, updateReportStatus, getMyReports } = require('../controllers/report.controller');

const router = express.Router();

// GET /api/reports/my  — citizen: own reports + stats (must be before /:id)
router.get('/my', protect, getMyReports);

// GET /api/reports  — admin only
router.get('/', protect, adminProtect, getAllReports);

// POST /api/reports
router.post('/', protect, upload.array('photos', 5), createReport);

// PUT /api/reports/:id/status
router.put('/:id/status', protect, adminProtect, updateReportStatus);

module.exports = router;


