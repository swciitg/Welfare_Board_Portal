import { z } from 'zod';
import AboutUs from '../../models/aboutUs.js';

export const registerAboutUsTools = (server) => {

  server.tool(
    'get_about_us',
    `Returns the "About Us" section content for the Student Welfare Board website.
This is a singleton document — there is only one About Us record in the database.
The returned document contains:
  - _id: MongoDB ObjectId (not needed for updates — this is a singleton).
  - image: URL of the image displayed alongside the About Us text.
  - description: The full About Us body text describing the SWB's mission, values, and purpose.
  - createdAt: Timestamp of when this record was created.

Use update_about_us to change the image or description.`,
    {},
    async () => {
      try {
        const aboutUs = await AboutUs.findOne({});
        return { content: [{ type: 'text', text: JSON.stringify(aboutUs, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching About Us info: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_about_us',
    `Updates the "About Us" page content for the Student Welfare Board website.
This is a singleton document — there is only one About Us record. No ID is needed.
Only provide the fields you want to change — omitting a field leaves it unchanged.
If no About Us document exists yet, it will be automatically created (upsert).

Returns the full updated document on success.`,
    {
      image: z.string().optional().describe('New URL for the image displayed on the About Us section/page. Should be a publicly accessible HTTPS URL.'),
      description: z.string().optional().describe('The full body text of the About Us section. This should describe the SWB\'s mission, history, values, and goals. Can include multiple paragraphs as a single string.')
    },
    async (updates) => {
      try {
        const aboutUs = await AboutUs.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
        return { content: [{ type: 'text', text: `About Us info updated successfully:\n${JSON.stringify(aboutUs, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating About Us info: ${err.message}` }], isError: true };
      }
    }
  );
};
