import mongoose from 'mongoose';

const counselorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  landline: {
    type: String,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  schedule: {
    monday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    tuesday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    wednesday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    thursday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    friday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    saturday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
    sunday: {
      time: { type: String, default: 'Closed' },
      location: { type: String, trim: true },
    },
  },
  priority: {
    type: Number,
    default: 0,
    comment: 'Used for ordering. Higher numbers appear first.',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for efficient queries
counselorSchema.index({ priority: -1, isActive: 1 });

const Counselor = mongoose.model('Counselor', counselorSchema);

export default Counselor;
