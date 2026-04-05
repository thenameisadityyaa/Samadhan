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
    location: {
      type: String,
      required: false,
    },
    coordinates: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: []
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

module.exports = Report;


