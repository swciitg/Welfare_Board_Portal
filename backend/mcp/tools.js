// backend/mcp/tools.js
import { z } from 'zod';
import clubMain from '../models/clubMain.js';
import Contacts from '../models/contact.js';
import Counselor from '../models/counselor.js';
import Event from '../models/event.js';
import Homepage from '../models/general.js';

export const registerTools = (server) => {

  // --- Clubs ---
  server.tool(
    'list_clubs',
    'Get all student clubs at IIT Guwahati with name, image, and URL-safe slug',
    {},
    async () => {
      const clubs = await clubMain.find({}, 'name img safeName');
      return { content: [{ type: 'text', text: JSON.stringify(clubs, null, 2) }] };
    }
  );

  server.tool(
    'get_club',
    'Get full details of a specific club including about, rules, events, achievements, gallery',
    { safeName: z.string().describe('The URL-safe club name, e.g. "saathi" or "social-service-club"') },
    async ({ safeName }) => {
      const club = await clubMain.findOne({ safeName });
      if (!club) return { content: [{ type: 'text', text: `Club "${safeName}" not found` }] };
      return { content: [{ type: 'text', text: JSON.stringify(club, null, 2) }] };
    }
  );

  // --- Events ---
  server.tool(
    'list_events',
    'Get all welfare board events with names and front images',
    {},
    async () => {
      const events = await Event.find({}, 'eventName frontImage eventIntroDesc');
      return { content: [{ type: 'text', text: JSON.stringify(events, null, 2) }] };
    }
  );

  server.tool(
    'get_event',
    'Get full details of an event by its MongoDB ID',
    { id: z.string().describe('MongoDB ObjectId of the event') },
    async ({ id }) => {
      const event = await Event.findById(id);
      if (!event) return { content: [{ type: 'text', text: `Event "${id}" not found` }] };
      return { content: [{ type: 'text', text: JSON.stringify(event, null, 2) }] };
    }
  );

  // --- Contacts ---
  server.tool(
    'list_contacts',
    'Get SWB contacts. Optionally filter by category.',
    {
      category: z.enum([
        'Chairpersons', 'Core Team', 'Department Heads',
        'Club Secretaries', 'Hostel Secretaries', 'Emergency', 'Anti-Ragging'
      ]).optional().describe('Filter by contact category')
    },
    async ({ category }) => {
      const query = category ? { category } : {};
      const contacts = await Contacts.find(query).sort({ category: 1, priority: -1 });
      return { content: [{ type: 'text', text: JSON.stringify(contacts, null, 2) }] };
    }
  );

  // --- Counselors ---
  server.tool(
    'list_counselors',
    'Get all active counselors with their weekly schedules and contact info',
    {},
    async () => {
      const counselors = await Counselor.find({ isActive: true }).sort({ priority: -1 });
      return { content: [{ type: 'text', text: JSON.stringify(counselors, null, 2) }] };
    }
  );

  // --- Homepage / Board info ---
  server.tool(
    'get_board_info',
    'Get general SWB board information: chairperson names, GenSec, hero images, board name',
    {},
    async () => {
      const homepage = await Homepage.findOne({});
      return { content: [{ type: 'text', text: JSON.stringify(homepage, null, 2) }] };
    }
  );
};