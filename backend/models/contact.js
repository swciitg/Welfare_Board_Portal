import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Chairpersons', 'Core Team', 'Department Heads', 'Club Secretaries', 'Hostel Secretaries', 'Emergency', 'Anti-Ragging'],
    default: 'Core Team',
  },
  priority: {
    type: Number,
    default: 0,
    comment: 'Used for ordering within category. Higher numbers appear first.',
  },
  socialLinks: {
    linkedin: { type: String, trim: true },
    mailId: { type: String, trim: true },
    phoneNo: { type: String, trim: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for efficient category-based queries
contactSchema.index({ category: 1, priority: -1 });

const Contacts = mongoose.model('Contacts', contactSchema);

export default Contacts;