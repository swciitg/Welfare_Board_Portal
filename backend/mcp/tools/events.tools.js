import { z } from 'zod';
import Event from '../../models/event.js';

export const registerEventTools = (server) => {

  server.tool(
    'list_events',
    `Returns a summary list of all Welfare Board events.
Each entry includes:
  - _id: MongoDB ObjectId — use this as the "id" argument in get_event, update_event, and delete_event.
  - eventName: The display name of the event.
  - frontImage: URL of the event's cover/hero image.
  - eventIntroDesc: A brief introductory description of the event.

Use this tool first to discover existing events and retrieve their IDs before calling get_event, update_event, or delete_event.`,
    {},
    async () => {
      try {
        const events = await Event.find({}, 'eventName frontImage eventIntroDesc');
        return { content: [{ type: 'text', text: JSON.stringify(events, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching events: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'get_event',
    `Returns the full details of a single event identified by its MongoDB ObjectId.
Returns all stored fields:
  - eventName, frontImage, eventIntroDesc
  - eventPdf: URL to the event's PDF document/brochure.
  - eventActivityDesc: A detailed description of the event activities.
  - pastWinners[]: Array of past winner names/descriptions.
  - milestones[]: Array of milestone strings for the event.
  - galleryImages[]: Array of gallery image URLs.
  - memberImages[]: Array of image URLs of event team members.
  - createdAt: Timestamp when the event was created.

Use list_events first to obtain valid MongoDB IDs.`,
    {
      id: z.string().describe(
        'The MongoDB ObjectId of the event. This is the _id field returned by list_events. Example: "64b7f3c2e4b0a1234567890a". Must be a valid 24-character hex string.'
      )
    },
    async ({ id }) => {
      try {
        const event = await Event.findById(id);
        if (!event) return { content: [{ type: 'text', text: `Event "${id}" not found. Use list_events to see all valid event IDs.` }] };
        return { content: [{ type: 'text', text: JSON.stringify(event, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching event ${id}: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_event',
    `Creates a new Welfare Board event entry. All fields are required.
Image fields (frontImage, memberImages, galleryImages) should be publicly accessible HTTPS URLs or backend-served paths.
Array fields (pastWinners, milestones, galleryImages, memberImages) must be arrays even if empty — pass [] for empty.
The eventPdf field should be a URL to the event's brochure or information document.

Returns the full created event document including its assigned _id on success.`,
    {
      eventName: z.string().describe('The display name of the event as shown on the frontend. E.g. "Aarohan 2025", "Welfare Run".'),
      eventPdf: z.string().describe('URL to a PDF document or brochure for the event. Must be a valid URL.'),
      frontImage: z.string().describe('URL of the hero/cover image displayed at the top of the event\'s page.'),
      eventIntroDesc: z.string().describe('A short introductory description of the event (1-3 sentences). Shown on the events listing page.'),
      eventActivityDesc: z.string().describe('A detailed description of the event activities, schedule, or what participants can expect.'),
      pastWinners: z.array(z.string()).describe('Array of past winner name/description strings. Each element represents one winner entry. Use [] if no past winners.'),
      milestones: z.array(z.string()).describe('Array of milestone description strings (e.g. "1000 participants in 2023"). Use [] if none.'),
      galleryImages: z.array(z.string()).describe('Array of image URLs for the event\'s photo gallery section. Use [] if none.'),
      memberImages: z.array(z.string()).describe('Array of image URLs of the event organising team members. Use [] if none.')
    },
    async (args) => {
      try {
        const event = new Event(args);
        await event.save();
        return { content: [{ type: 'text', text: `Event created successfully:\n${JSON.stringify(event, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating event: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_event',
    `Updates one or more fields of an existing event identified by its MongoDB ObjectId.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).
Array fields (pastWinners, milestones, galleryImages, memberImages) replace the entire existing array when provided.

Use list_events to get the correct MongoDB id before calling this.
Returns the updated event document on success.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the event to update. Use list_events to find this. Example: "64b7f3c2e4b0a1234567890a".'),
      eventName: z.string().optional().describe('New display name for the event.'),
      eventPdf: z.string().optional().describe('New URL for the event\'s PDF document.'),
      frontImage: z.string().optional().describe('New URL for the event\'s hero/cover image.'),
      eventIntroDesc: z.string().optional().describe('Updated short introductory description.'),
      eventActivityDesc: z.string().optional().describe('Updated detailed activity description.'),
      pastWinners: z.array(z.string()).optional().describe('Replacement array of past winner strings. Replaces the entire list when provided.'),
      milestones: z.array(z.string()).optional().describe('Replacement array of milestone strings. Replaces the entire list when provided.'),
      galleryImages: z.array(z.string()).optional().describe('Replacement array of gallery image URLs. Replaces the entire list when provided.'),
      memberImages: z.array(z.string()).optional().describe('Replacement array of team member image URLs. Replaces the entire list when provided.')
    },
    async ({ id, ...updates }) => {
      try {
        const event = await Event.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!event) return { content: [{ type: 'text', text: `Event "${id}" not found. Use list_events to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Event updated successfully:\n${JSON.stringify(event, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating event: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_event',
    `Permanently deletes an event from the database by its MongoDB ObjectId. This action is irreversible.
Use list_events first to confirm the event exists and to retrieve its _id.
Returns a success message on deletion, or an error if the event was not found.

⚠️ Warning: This permanently removes all event data including descriptions, images, winners, and milestones.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the event to permanently delete. Use list_events to find this value before deleting.')
    },
    async ({ id }) => {
      try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) return { content: [{ type: 'text', text: `Event "${id}" not found. Use list_events to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Event "${event.eventName}" (id: ${id}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting event: ${err.message}` }], isError: true };
      }
    }
  );
};
