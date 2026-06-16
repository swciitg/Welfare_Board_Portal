import mongoose from 'mongoose';

const foodOutletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specialties: {
    type: [String],
    required: true,
  },
  delivery: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FoodOutlet = mongoose.model('FoodOutlet', foodOutletSchema);

export default FoodOutlet;
