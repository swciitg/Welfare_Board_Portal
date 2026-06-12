import { z } from 'zod';
import Counselor from '../../models/counselor.js';

const VALID_LOCATIONS = [
  'Lohit Hostel', 'Bramhaputra Hostel', 'Siang Hostel', 'Kapili Hostel',
  'Dihing Hostel', 'Manas Hostel', 'Umaim Hostel', 'Barak Hostel',
  'Kameng Hostel', 'Gaurang Hostel', 'Dhansiri Hostel', 'Disang Hostel',
  'Subansiri Hostel', 'New Sac Building', ''
];

const hostelEnum = z.enum([
  'Lohit Hostel', 'Bramhaputra Hostel', 'Siang Hostel', 'Kapili Hostel',
  'Dihing Hostel', 'Manas Hostel', 'Umaim Hostel', 'Barak Hostel',
  'Kameng Hostel', 'Gaurang Hostel', 'Dhansiri Hostel', 'Disang Hostel',
  'Subansiri Hostel', 'New Sac Building', ''
]);

const locationDesc = `Must be exactly one of: ${VALID_LOCATIONS.filter(l => l).join(', ')}, or "" (empty string) for no location. Default is "New Sac Building".`;
const timeDesc = 'Time slot string for the counseling session. E.g. "10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM". Use "Closed" if no session on that day.';

export const registerCounselorTools = (server) => {

  server.tool(
    'list_counselors',
    `Returns all active counselors (isActive: true) at IIT Guwahati's Student Wellness Centre.
Results are sorted by priority (descending — higher priority counselors appear first).
Each entry includes:
  - _id: MongoDB ObjectId — use this in update_counselor and delete_counselor.
  - name, photo, mobile, email, landline, specialization
  - schedule: Object with keys monday through sunday. Each day has:
      - time: The counseling session time (e.g. "10:00 AM - 12:00 PM") or "Closed".
      - location: The hostel or venue for that day's session.
  - priority: Integer controlling display order (higher = shown first).
  - isActive: Boolean — only active counselors are returned by this tool.

To see inactive counselors or manage them, use update_counselor with isActive: true/false.`,
    {},
    async () => {
      try {
        const counselors = await Counselor.find({ isActive: true }).sort({ priority: -1 });
        return { content: [{ type: 'text', text: JSON.stringify(counselors, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching counselors: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_counselor',
    `Creates a new counselor record. Required fields: name, photo, mobile, email, specialization.
New counselors default to isActive: true and priority: 0.
Weekly schedule can be set via update_counselor after creation, or the counselor will default to "Closed" for all days at "New Sac Building".

Returns the full created counselor document including the assigned _id.`,
    {
      name: z.string().describe('Full name of the counselor. E.g. "Dr. Ananya Sharma".'),
      photo: z.string().describe('URL or path to the counselor\'s profile photo.'),
      mobile: z.string().describe('Mobile number as a string. E.g. "+91-9876543210".'),
      email: z.string().describe('Official email address. E.g. "ananya@iitg.ac.in". Must be a valid email format.'),
      specialization: z.string().describe('The counselor\'s area of expertise. E.g. "Clinical Psychology", "Career Counseling", "Stress Management".'),
      landline: z.string().optional().describe('Office landline number. E.g. "0361-258-1234". Optional.'),
      priority: z.number().optional().describe('Integer for ordering on the frontend. Higher numbers appear first. Default is 0.'),
      isActive: z.boolean().optional().describe('Whether this counselor is currently active and visible. Defaults to true. Set to false to hide them without deleting.')
    },
    async (args) => {
      try {
        const counselor = new Counselor(args);
        await counselor.save();
        return { content: [{ type: 'text', text: `Counselor created successfully:\n${JSON.stringify(counselor, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating counselor: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_counselor',
    `Updates one or more fields of an existing counselor identified by their MongoDB ObjectId.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).

SCHEDULE UPDATES: To update a counselor's schedule, use the flat day_time and day_location fields.
This is safe — updating only "monday_time" does NOT erase other days' schedules.
For example: { id: "...", monday_time: "10:00 AM - 12:00 PM", monday_location: "Lohit Hostel" }
This updates only Monday and leaves all other days untouched.

Use "Closed" for time if no session on that day.
Set isActive: false to deactivate a counselor without deleting them.

Use list_counselors to get the correct _id before calling this.
Returns the updated counselor document on success.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the counselor to update. Use list_counselors to find this.'),
      name: z.string().optional().describe('Updated full name.'),
      photo: z.string().optional().describe('New URL for the counselor\'s profile photo.'),
      mobile: z.string().optional().describe('Updated mobile number.'),
      email: z.string().optional().describe('Updated email address.'),
      specialization: z.string().optional().describe('Updated area of specialization.'),
      landline: z.string().optional().describe('Updated landline number.'),
      priority: z.number().optional().describe('Updated priority integer. Higher = appears first.'),
      isActive: z.boolean().optional().describe('Set to false to deactivate this counselor (hides them from list_counselors without deleting). Set to true to reactivate.'),
      monday_time: z.string().optional().describe(`${timeDesc} Updates only Monday's time.`),
      monday_location: hostelEnum.optional().describe(`Monday session location. ${locationDesc}`),
      tuesday_time: z.string().optional().describe(`${timeDesc} Updates only Tuesday's time.`),
      tuesday_location: hostelEnum.optional().describe(`Tuesday session location. ${locationDesc}`),
      wednesday_time: z.string().optional().describe(`${timeDesc} Updates only Wednesday's time.`),
      wednesday_location: hostelEnum.optional().describe(`Wednesday session location. ${locationDesc}`),
      thursday_time: z.string().optional().describe(`${timeDesc} Updates only Thursday's time.`),
      thursday_location: hostelEnum.optional().describe(`Thursday session location. ${locationDesc}`),
      friday_time: z.string().optional().describe(`${timeDesc} Updates only Friday's time.`),
      friday_location: hostelEnum.optional().describe(`Friday session location. ${locationDesc}`),
      saturday_time: z.string().optional().describe(`${timeDesc} Updates only Saturday's time.`),
      saturday_location: hostelEnum.optional().describe(`Saturday session location. ${locationDesc}`),
      sunday_time: z.string().optional().describe(`${timeDesc} Updates only Sunday's time.`),
      sunday_location: hostelEnum.optional().describe(`Sunday session location. ${locationDesc}`)
    },
    async ({
      id,
      monday_time, monday_location,
      tuesday_time, tuesday_location,
      wednesday_time, wednesday_location,
      thursday_time, thursday_location,
      friday_time, friday_location,
      saturday_time, saturday_location,
      sunday_time, sunday_location,
      ...updates
    }) => {
      try {
        if (monday_time !== undefined) updates['schedule.monday.time'] = monday_time;
        if (monday_location !== undefined) updates['schedule.monday.location'] = monday_location;
        if (tuesday_time !== undefined) updates['schedule.tuesday.time'] = tuesday_time;
        if (tuesday_location !== undefined) updates['schedule.tuesday.location'] = tuesday_location;
        if (wednesday_time !== undefined) updates['schedule.wednesday.time'] = wednesday_time;
        if (wednesday_location !== undefined) updates['schedule.wednesday.location'] = wednesday_location;
        if (thursday_time !== undefined) updates['schedule.thursday.time'] = thursday_time;
        if (thursday_location !== undefined) updates['schedule.thursday.location'] = thursday_location;
        if (friday_time !== undefined) updates['schedule.friday.time'] = friday_time;
        if (friday_location !== undefined) updates['schedule.friday.location'] = friday_location;
        if (saturday_time !== undefined) updates['schedule.saturday.time'] = saturday_time;
        if (saturday_location !== undefined) updates['schedule.saturday.location'] = saturday_location;
        if (sunday_time !== undefined) updates['schedule.sunday.time'] = sunday_time;
        if (sunday_location !== undefined) updates['schedule.sunday.location'] = sunday_location;

        const counselor = await Counselor.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!counselor) return { content: [{ type: 'text', text: `Counselor "${id}" not found. Use list_counselors to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Counselor updated successfully:\n${JSON.stringify(counselor, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating counselor: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_counselor',
    `Permanently deletes a counselor record by their MongoDB ObjectId. This action is irreversible.
Consider using update_counselor with isActive: false instead of deleting, to preserve historical records.
Use list_counselors first to confirm the counselor's _id.

⚠️ Warning: This permanently removes all data for this counselor including their schedule and contact info.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the counselor to permanently delete. Use list_counselors to find this. Consider update_counselor with isActive: false as a reversible alternative.')
    },
    async ({ id }) => {
      try {
        const counselor = await Counselor.findByIdAndDelete(id);
        if (!counselor) return { content: [{ type: 'text', text: `Counselor "${id}" not found. Use list_counselors to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Counselor "${counselor.name}" (id: ${id}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting counselor: ${err.message}` }], isError: true };
      }
    }
  );
};
