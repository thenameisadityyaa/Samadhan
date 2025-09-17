const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Submitted', 'In Progress', 'Resolved'],
      default: 'Submitted',
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Allow anonymous reports for now
    },
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

module.exports = Report;


