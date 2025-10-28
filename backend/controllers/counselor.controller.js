import Counselor from "../models/counselor.js";

export const getCounselors = async (req, res) => {
  try {
    // Fetch only active counselors, sorted by priority (descending)
    const counselors = await Counselor.find({ isActive: true }).sort({ priority: -1 });
    
    res.status(200).json({ counselors }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching counselors', error: error.message });
  }
};

export const getAllCounselors = async (req, res) => {
  try {
    // Fetch all counselors (including inactive ones) for admin purposes
    const counselors = await Counselor.find().sort({ priority: -1 });
    
    res.status(200).json({ counselors }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all counselors', error: error.message });
  }
};
