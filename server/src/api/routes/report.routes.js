const express = require('express');
const { protect } = require('../../middleware/auth');
const { createReport, getAllReports } = require('../controllers/report.controller');

const router = express.Router();

// GET /api/reports
router.get('/', getAllReports);

// POST /api/reports (temporarily without auth for testing)
router.post('/', createReport);

module.exports = router;


