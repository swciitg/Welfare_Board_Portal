import { z } from 'zod';
import Facilities from '../../models/facilities.js';

export const registerFacilityTools = (server) => {

  server.tool(
    'list_facilities',
    `Returns a list of all sports and recreational facilities available at IIT Guwahati as managed by the Student Welfare Board.
Each entry includes:
  - _id: MongoDB ObjectId — use this as the "id" argument in update_facility and delete_facility.
  - title: The display name of the facility. E.g. "Basketball Court".
  - image: URL of the facility's photo.
  - game: The sport or activity associated with this facility. E.g. "Basketball".

Use this tool to discover existing facilities and retrieve their IDs before updating or deleting.`,
    {},
    async () => {
      try {
        const facilities = await Facilities.find({});
        return { content: [{ type: 'text', text: JSON.stringify(facilities, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching facilities: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_facility',
    `Creates a new sports or recreational facility entry. All three fields are required.
Returns the full created facility document including its assigned _id on success.`,
    {
      title: z.string().describe('The display name of the facility shown on the frontend. E.g. "Basketball Court", "Swimming Pool", "Badminton Hall".'),
      image: z.string().describe('URL or path to a photo of the facility. Should be a publicly accessible HTTPS URL.'),
      game: z.string().describe('The sport or activity type associated with this facility. E.g. "Basketball", "Swimming", "Badminton", "Table Tennis".')
    },
    async (args) => {
      try {
        const facility = new Facilities(args);
        await facility.save();
        return { content: [{ type: 'text', text: `Facility created successfully:\n${JSON.stringify(facility, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating facility: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_facility',
    `Updates one or more fields of an existing facility identified by its MongoDB ObjectId.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).

Use list_facilities to obtain the correct _id before calling this.
Returns the updated facility document on success.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the facility to update. Use list_facilities to find this. Example: "64b7f3c2e4b0a1234567890a".'),
      title: z.string().optional().describe('Updated display name for the facility. E.g. "Renovated Basketball Court".'),
      image: z.string().optional().describe('New URL for the facility\'s photo.'),
      game: z.string().optional().describe('Updated sport or activity type associated with this facility.')
    },
    async ({ id, ...updates }) => {
      try {
        const facility = await Facilities.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!facility) return { content: [{ type: 'text', text: `Facility "${id}" not found. Use list_facilities to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Facility updated successfully:\n${JSON.stringify(facility, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating facility: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_facility',
    `Permanently deletes a facility entry from the database by its MongoDB ObjectId. This action is irreversible.
Use list_facilities first to confirm the facility exists and to retrieve its _id.
Returns a success message on deletion, or an error if the facility was not found.

⚠️ Warning: This permanently removes the facility entry and all its data.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the facility to permanently delete. Use list_facilities to find this value before deleting.')
    },
    async ({ id }) => {
      try {
        const facility = await Facilities.findByIdAndDelete(id);
        if (!facility) return { content: [{ type: 'text', text: `Facility "${id}" not found. Use list_facilities to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Facility "${facility.title}" (${facility.game}, id: ${id}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting facility: ${err.message}` }], isError: true };
      }
    }
  );
};
