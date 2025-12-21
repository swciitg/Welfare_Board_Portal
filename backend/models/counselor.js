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
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    tuesday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    wednesday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    thursday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    friday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    saturday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
    },
    sunday: {
      time: { type: String, default: 'Closed' },
      location: { 
        type: String, 
        trim: true,
        default: 'New Sac Building',
        enum: [
          'Lohit Hostel',
          'Bramhaputra Hostel',
          'Siang Hostel',
          'Kapili Hostel',
          'Dihing Hostel',
          'Manas Hostel',
          'Umaim Hostel',
          'Barak Hostel',
          'Kameng Hostel',
          'Gaurang Hostel',
          'Dhansiri Hostel',
          'Disang Hostel',
          'Subansiri Hostel',
          'New Sac Building',
          ''
        ]
      },
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
