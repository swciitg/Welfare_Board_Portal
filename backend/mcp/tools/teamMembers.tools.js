import { z } from 'zod';
import TeamMember from '../../models/teamMember.js';

export const registerTeamMemberTools = (server) => {

  server.tool(
    'list_team_members',
    `Returns a list of all Student Welfare Board team members (the current year's board members, office bearers, and contributors).
Each entry includes:
  - _id: MongoDB ObjectId — use this as the "id" argument in update_team_member and delete_team_member.
  - name: Full name of the team member.
  - role: Their role/position on the board. E.g. "Secretary", "Joint Secretary".
  - department: Their academic department. E.g. "Computer Science and Engineering".
  - message: An optional personal message or quote from the member.
  - image: URL of their profile photo.
  - socialLinks: Object containing linkedin and instagram profile URLs.
  - createdAt: Timestamp when the record was created.

Use this tool to discover team members and retrieve their IDs before updating or deleting.`,
    {},
    async () => {
      try {
        const members = await TeamMember.find({});
        return { content: [{ type: 'text', text: JSON.stringify(members, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching team members: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_team_member',
    `Creates a new SWB team member record. Required fields: name, role, department, image.
Optional fields: message (personal quote), linkedin URL, instagram URL.
Social links (linkedin, instagram) are stored inside a "socialLinks" sub-object automatically.

Returns the full created team member document including the assigned _id on success.`,
    {
      name: z.string().describe('Full name of the team member. E.g. "Priya Singh".'),
      role: z.string().describe('Their official position or role on the board. E.g. "General Secretary", "Secretary for Sports", "Joint Secretary for Cultural Affairs".'),
      department: z.string().describe('Their academic department at IIT Guwahati. E.g. "Computer Science and Engineering", "Mechanical Engineering", "Physics".'),
      image: z.string().describe('URL or path to the team member\'s profile photo. Should be a publicly accessible HTTPS URL.'),
      message: z.string().optional().describe('A personal message, quote, or note from the team member. Shown on their profile card. Optional.'),
      linkedin: z.string().optional().describe('LinkedIn profile URL. E.g. "https://linkedin.com/in/priya-singh". Optional.'),
      instagram: z.string().optional().describe('Instagram profile URL. E.g. "https://instagram.com/priya.singh". Optional.')
    },
    async ({ linkedin, instagram, ...args }) => {
      try {
        const memberData = { ...args, socialLinks: { linkedin, instagram } };
        const member = new TeamMember(memberData);
        await member.save();
        return { content: [{ type: 'text', text: `Team member created successfully:\n${JSON.stringify(member, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating team member: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_team_member',
    `Updates one or more fields of an existing SWB team member identified by their MongoDB ObjectId.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).
Social link fields (linkedin, instagram) are merged individually into the socialLinks sub-object, so providing just "linkedin" will NOT erase an existing "instagram" URL.

Use list_team_members to obtain the correct _id before calling this.
Returns the updated team member document on success.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the team member to update. Use list_team_members to find this. Example: "64b7f3c2e4b0a1234567890a".'),
      name: z.string().optional().describe('Updated full name.'),
      role: z.string().optional().describe('Updated board role or position.'),
      department: z.string().optional().describe('Updated academic department.'),
      image: z.string().optional().describe('New URL for the team member\'s profile photo.'),
      message: z.string().optional().describe('Updated personal message or quote from the member.'),
      linkedin: z.string().optional().describe('New LinkedIn URL. Only updates linkedin — does not affect instagram.'),
      instagram: z.string().optional().describe('New Instagram URL. Only updates instagram — does not affect linkedin.')
    },
    async ({ id, linkedin, instagram, ...updates }) => {
      try {
        if (linkedin !== undefined) updates['socialLinks.linkedin'] = linkedin;
        if (instagram !== undefined) updates['socialLinks.instagram'] = instagram;

        const member = await TeamMember.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!member) return { content: [{ type: 'text', text: `Team member "${id}" not found. Use list_team_members to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Team member updated successfully:\n${JSON.stringify(member, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating team member: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_team_member',
    `Permanently deletes a team member record from the database by their MongoDB ObjectId. This action is irreversible.
Use list_team_members first to confirm the member exists and to retrieve their _id.
Returns a success message on deletion, or an error if the member was not found.

⚠️ Warning: This permanently removes all data for this team member. At the end of an academic year, consider archiving data manually before deleting records.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the team member to permanently delete. Use list_team_members to find this value before deleting.')
    },
    async ({ id }) => {
      try {
        const member = await TeamMember.findByIdAndDelete(id);
        if (!member) return { content: [{ type: 'text', text: `Team member "${id}" not found. Use list_team_members to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Team member "${member.name}" (${member.role}, id: ${id}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting team member: ${err.message}` }], isError: true };
      }
    }
  );
};
