import { z } from 'zod';
import Homepage from '../../models/general.js';

export const registerBoardInfoTools = (server) => {

  server.tool(
    'get_board_info',
    `Returns the general Student Welfare Board (SWB) information stored in the database.
This is a singleton document — there is only one board info record.
The returned document contains:
  - boardname: The official name of the board (e.g. "Student Welfare Board, IIT Guwahati").
  - heroimage: URL of the main hero/banner image on the homepage.
  - eventimgurl: URL of the image displayed in the Events section of the homepage.
  - contactpageimgurl: URL of the image shown on the Contact page.
  - logoimgurl: URL of the board's logo image.
  - clubheroimg: URL of the hero image displayed on the Clubs listing page.
  - chairmanname: Name of the current Board Chairperson.
  - chairmanimgurl: URL of the Chairperson's photo.
  - aboutchairman: A short bio or description about the Chairperson.
  - chairmandescription: The Chairperson's message or extended description.
  - gensecname: Name of the current General Secretary.
  - gensecimg: URL of the General Secretary's photo.
  - aboutgensec: A short bio or description about the General Secretary.
  - gensecdescription: The General Secretary's message or extended description.

Use update_board_info to change any of these values.`,
    {},
    async () => {
      try {
        const homepage = await Homepage.findOne({});
        return { content: [{ type: 'text', text: JSON.stringify(homepage, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching board info: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_board_info',
    `Updates the global Student Welfare Board (SWB) information. This is a singleton document — there is only one record.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).
If no board info document exists yet, it will be automatically created (upsert).

Typical use cases:
  - Update chairperson name and photo at the start of a new academic year.
  - Update the General Secretary's info after elections.
  - Refresh hero images for the homepage or clubs page.

Returns the full updated document on success.`,
    {
      boardname: z.string().optional().describe('Official name of the Student Welfare Board. E.g. "Student Welfare Board, IIT Guwahati".'),
      heroimage: z.string().optional().describe('URL of the main hero/banner image displayed on the homepage.'),
      eventimgurl: z.string().optional().describe('URL of the image shown in the Events section on the homepage.'),
      contactpageimgurl: z.string().optional().describe('URL of the banner image displayed on the Contact page.'),
      logoimgurl: z.string().optional().describe('URL of the SWB logo image used across the site.'),
      clubheroimg: z.string().optional().describe('URL of the hero image displayed at the top of the Clubs listing page.'),
      chairmanname: z.string().optional().describe('Full name of the current Board Chairperson. E.g. "Prof. Rajesh Mehta".'),
      chairmanimgurl: z.string().optional().describe('URL of the Chairperson\'s profile photo.'),
      aboutchairman: z.string().optional().describe('Short biography or intro about the Chairperson (1-3 sentences).'),
      chairmandescription: z.string().optional().describe('Full message or extended description from the Chairperson (shown in their dedicated section on the homepage).'),
      gensecname: z.string().optional().describe('Full name of the current General Secretary. E.g. "Arjun Verma".'),
      gensecimg: z.string().optional().describe('URL of the General Secretary\'s profile photo.'),
      aboutgensec: z.string().optional().describe('Short biography or intro about the General Secretary.'),
      gensecdescription: z.string().optional().describe('Full message or extended description from the General Secretary.')
    },
    async (updates) => {
      try {
        const homepage = await Homepage.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
        return { content: [{ type: 'text', text: `Board info updated successfully:\n${JSON.stringify(homepage, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating board info: ${err.message}` }], isError: true };
      }
    }
  );
};
