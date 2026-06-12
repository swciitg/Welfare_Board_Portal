import { z } from 'zod';
import clubMain from '../../models/clubMain.js';

export const registerClubTools = (server) => {

  server.tool(
    'list_clubs',
    `Returns a summary list of all student clubs at IIT Guwahati registered under the Student Welfare Board.
Each entry includes:
  - _id: MongoDB ObjectId (use this when a specific ID is needed elsewhere)
  - name: The human-readable display name of the club (e.g. "Saathi")
  - safeName: The URL-safe slug for the club (e.g. "saathi"). Use this with get_club or update_club.
  - img: URL of the club's thumbnail image.

Use this tool first to discover available clubs and their safeNames before calling get_club, update_club, or delete_club.`,
    {},
    async () => {
      try {
        const clubs = await clubMain.find({}, 'name img safeName');
        return { content: [{ type: 'text', text: JSON.stringify(clubs, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching clubs: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'get_club',
    `Returns the full details of a single club identified by its safeName slug.
Returns all fields stored in the database for that club:
  - name, safeName, img
  - aboutDesc: A paragraph describing what the club is about.
  - rules: The club's rules and guidelines text.
  - aboutusimg, rulesimg: Image URLs for the About Us and Rules sections.
  - pastEventsImg, achievementsImg: Banner image URLs for those sections.
  - pastEvents[]: Array of past event description strings.
  - achievements[]: Array of achievement description strings.
  - galleryImages[]: Array of image URLs for the club's photo gallery.
  - leaderImages[]: Array of image URLs of club leaders/members.
  - createdAt: Timestamp of when the club entry was created.

If the club is not found, returns a descriptive error message.
Use list_clubs first to find the correct safeName.`,
    {
      safeName: z.string().describe(
        'The URL-safe slug that uniquely identifies the club. Use lowercase with hyphens. Example: "saathi", "social-service-club", "music-club". Use list_clubs to find the correct safeName.'
      )
    },
    async ({ safeName }) => {
      try {
        const club = await clubMain.findOne({ safeName });
        if (!club) return { content: [{ type: 'text', text: `Club "${safeName}" not found. Use list_clubs to see all valid safeNames.` }] };
        return { content: [{ type: 'text', text: JSON.stringify(club, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching club ${safeName}: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_club',
    `Creates a brand new club entry in the database. All fields are required.
Image fields (img, aboutusimg, rulesimg, pastEventsImg, achievementsImg) should be publicly accessible HTTPS URLs or relative paths served by the backend.
Array fields (pastEvents, achievements, galleryImages, leaderImages) must be provided as arrays even if empty (use []).
The safeName must be unique across all clubs — it acts as the human-readable identifier used in URLs and by other tools. Use lowercase letters and hyphens only (e.g. "chess-club").

Returns the full created document on success.`,
    {
      name: z.string().describe('The display name of the club. E.g. "Chess Club", "Saathi". This is shown on the frontend.'),
      safeName: z.string().describe('A unique URL-safe identifier. Use only lowercase letters and hyphens. E.g. "chess-club", "saathi". Must not duplicate an existing club\'s safeName.'),
      img: z.string().describe('HTTPS URL or path to the club\'s main thumbnail/logo image shown on the clubs listing page.'),
      aboutDesc: z.string().describe('A descriptive paragraph about the club — its purpose, activities, and goals. Shown on the club\'s About section.'),
      rules: z.string().describe('The club\'s rules and membership guidelines as a text block.'),
      aboutusimg: z.string().describe('URL of the banner/cover image displayed in the About Us section of the club\'s page.'),
      rulesimg: z.string().describe('URL of the banner/cover image displayed in the Rules section of the club\'s page.'),
      pastEventsImg: z.string().describe('URL of the banner image displayed in the Past Events section.'),
      achievementsImg: z.string().describe('URL of the banner image displayed in the Achievements section.'),
      pastEvents: z.array(z.string()).describe('Array of past event description strings. Each string represents one past event. Can be empty array [].'),
      achievements: z.array(z.string()).describe('Array of achievement description strings. Each string is one achievement. Can be empty array [].'),
      galleryImages: z.array(z.string()).describe('Array of image URLs for the club\'s photo gallery. Can be empty array [].'),
      leaderImages: z.array(z.string()).describe('Array of image URLs showing club leaders or team members. Can be empty array [].')
    },
    async (args) => {
      try {
        const club = new clubMain(args);
        await club.save();
        return { content: [{ type: 'text', text: `Club created successfully:\n${JSON.stringify(club, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating club: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_club',
    `Updates one or more fields of an existing club. Identified by its safeName.
Only include the fields you want to change — omitted fields are left untouched in the database (uses MongoDB $set).
For example, to only update the about description, just provide safeName and aboutDesc.
Array fields (pastEvents, achievements, galleryImages, leaderImages) replace the entire array when provided.

Use list_clubs to find the correct safeName before calling this tool.
Returns the updated club document on success.`,
    {
      safeName: z.string().describe('The URL-safe slug of the club to update. Use list_clubs to find this value. E.g. "saathi", "chess-club".'),
      name: z.string().optional().describe('New display name for the club. Only provide if you want to change it.'),
      img: z.string().optional().describe('New URL for the club\'s main thumbnail image.'),
      aboutDesc: z.string().optional().describe('Updated club description text.'),
      rules: z.string().optional().describe('Updated rules text for the club.'),
      aboutusimg: z.string().optional().describe('New URL for the About Us section banner image.'),
      rulesimg: z.string().optional().describe('New URL for the Rules section banner image.'),
      pastEventsImg: z.string().optional().describe('New URL for the Past Events section banner image.'),
      achievementsImg: z.string().optional().describe('New URL for the Achievements section banner image.'),
      pastEvents: z.array(z.string()).optional().describe('Replacement array of past event strings. Replaces the whole list when provided.'),
      achievements: z.array(z.string()).optional().describe('Replacement array of achievement strings. Replaces the whole list when provided.'),
      galleryImages: z.array(z.string()).optional().describe('Replacement gallery image URL array. Replaces the whole list when provided.'),
      leaderImages: z.array(z.string()).optional().describe('Replacement leader/member image URL array. Replaces the whole list when provided.')
    },
    async ({ safeName, ...updates }) => {
      try {
        const club = await clubMain.findOneAndUpdate({ safeName }, { $set: updates }, { new: true });
        if (!club) return { content: [{ type: 'text', text: `Club "${safeName}" not found. Use list_clubs to see all valid safeNames.` }], isError: true };
        return { content: [{ type: 'text', text: `Club updated successfully:\n${JSON.stringify(club, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating club: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_club',
    `Permanently deletes a club from the database by its safeName. This action is irreversible.
Use list_clubs first to confirm the safeName exists.
Returns a success message on deletion, or an error if the club was not found.

⚠️ Warning: This permanently removes all club data including descriptions, images, events, and achievements.`,
    {
      safeName: z.string().describe('The URL-safe slug of the club to permanently delete. E.g. "chess-club". Use list_clubs to confirm this value before deleting.')
    },
    async ({ safeName }) => {
      try {
        const club = await clubMain.findOneAndDelete({ safeName });
        if (!club) return { content: [{ type: 'text', text: `Club "${safeName}" not found. Use list_clubs to see all valid safeNames.` }], isError: true };
        return { content: [{ type: 'text', text: `Club "${safeName}" (${club.name}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting club: ${err.message}` }], isError: true };
      }
    }
  );
};
