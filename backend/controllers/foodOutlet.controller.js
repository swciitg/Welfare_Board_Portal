import FoodOutlet from '../models/foodOutlet.js';

export const getFoodOutlets = async (req, res) => {
  try {
    const foodOutlets = await FoodOutlet.find().sort({ priority: -1 });
    res.status(200).json(foodOutlets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food outlets', error });
  }
};
