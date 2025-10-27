import Contacts from "../models/contact.js";
import Homepage from "../models/general.js";

export const getContacts = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build query based on optional category filter
    const query = category ? { category } : {};
    
    // Fetch contacts sorted by priority (descending) within each category
    const contacts = await Contacts.find(query).sort({ category: 1, priority: -1 }); 
    const homepage = await Homepage.find({}, 'contactpageimgurl');
    
    res.status(200).json({ contacts, homepage }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};