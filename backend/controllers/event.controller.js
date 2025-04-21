import Event from '../models/event.js'; // Import the Event model
import Homepage from '../models/general.js';

// Controller function to fetch an event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params; // Get event ID from URL parameters

  try {
    const event = await Event.findById(id); // Find the event by ID

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event); // Send the event data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the event', error });
  }
};


export const getAll = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    const homepage = await Homepage.find({} );
    const homepage2 = await Homepage.find({});

    res.status(200).json({events , homepage }); // Send the events data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
}