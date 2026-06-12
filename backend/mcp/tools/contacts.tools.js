import { z } from 'zod';
import Contacts from '../../models/contact.js';

const VALID_CATEGORIES = ['Chairpersons', 'Core Team', 'Department Heads', 'Club Secretaries', 'Hostel Secretaries', 'Emergency', 'Anti-Ragging'];

const categoryEnum = z.enum([
  'Chairpersons', 'Core Team', 'Department Heads',
  'Club Secretaries', 'Hostel Secretaries', 'Emergency', 'Anti-Ragging'
]);

export const registerContactTools = (server) => {

  server.tool(
    'list_contacts',
    `Returns a list of SWB (Student Welfare Board) contact persons.
Optionally filter by category to narrow results.
Each entry includes:
  - _id: MongoDB ObjectId — use this in update_contact and delete_contact.
  - name, designation, department
  - image: URL to the contact person's photo.
  - description: Additional info about the person.
  - category: The group this person belongs to.
  - priority: Sort order within the category (higher = appears first).
  - socialLinks: Object containing linkedin, mailId, phoneNo.

Results are sorted by category (ascending) and then by priority (descending, so higher priority appears first).

Valid categories: ${VALID_CATEGORIES.join(', ')}`,
    {
      category: categoryEnum.optional().describe(
        `Filter contacts by their category group. Leave empty to return all contacts.
Valid values:
  - "Chairpersons": The board chairpersons
  - "Core Team": Core welfare board team members
  - "Department Heads": Heads of specific departments or wings
  - "Club Secretaries": Secretaries of student clubs
  - "Hostel Secretaries": Hostel-level student representatives
  - "Emergency": Emergency contact numbers
  - "Anti-Ragging": Anti-ragging committee members`
      )
    },
    async ({ category }) => {
      try {
        const query = category ? { category } : {};
        const contacts = await Contacts.find(query).sort({ category: 1, priority: -1 });
        return { content: [{ type: 'text', text: JSON.stringify(contacts, null, 2) }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error fetching contacts: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'create_contact',
    `Creates a new contact person entry in the SWB directory.
Required fields: name, designation, image, category.
Optional fields: department, description, priority, and social links (linkedin, mailId, phoneNo).

The "priority" field controls display ordering within a category — higher numbers appear first. Default is 0.
The "category" must be exactly one of: ${VALID_CATEGORIES.join(', ')}.

Social link fields (linkedin, mailId, phoneNo) are stored inside a "socialLinks" sub-object automatically.
Returns the full created contact document on success.`,
    {
      name: z.string().describe('Full name of the contact person. E.g. "Dr. Suresh Kumar".'),
      designation: z.string().describe('Official designation or title. E.g. "Chairperson", "General Secretary", "Anti-Ragging Officer".'),
      image: z.string().describe('URL or path to the contact person\'s profile photo.'),
      category: categoryEnum.describe(
        `The category this contact belongs to. Must be exactly one of: ${VALID_CATEGORIES.join(', ')}.
Use "Emergency" for emergency helplines, "Anti-Ragging" for anti-ragging contacts, etc.`
      ),
      department: z.string().optional().describe('The department or wing this person belongs to. E.g. "Student Affairs", "Hostel Affairs". Optional.'),
      description: z.string().optional().describe('A short description or note about the person and their role. Optional.'),
      priority: z.number().optional().describe('Integer for ordering within the category. Higher numbers appear first. Default is 0. E.g. use 10 for the most important contact in a category.'),
      linkedin: z.string().optional().describe('LinkedIn profile URL. E.g. "https://linkedin.com/in/username". Optional.'),
      mailId: z.string().optional().describe('Email address. E.g. "contact@iitg.ac.in". Optional.'),
      phoneNo: z.string().optional().describe('Phone or mobile number as a string. E.g. "+91-9876543210". Optional.')
    },
    async ({ linkedin, mailId, phoneNo, ...args }) => {
      try {
        const contactData = { ...args, socialLinks: { linkedin, mailId, phoneNo } };
        const contact = new Contacts(contactData);
        await contact.save();
        return { content: [{ type: 'text', text: `Contact created successfully:\n${JSON.stringify(contact, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error creating contact: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'update_contact',
    `Updates one or more fields of an existing SWB contact identified by its MongoDB ObjectId.
Only provide the fields you want to change — omitted fields remain unchanged (uses MongoDB $set).
Social link fields (linkedin, mailId, phoneNo) are merged individually into the socialLinks sub-object, so providing just "linkedin" will not erase existing "mailId" or "phoneNo".

Use list_contacts to find the correct _id before calling this tool.
Returns the updated contact document on success.`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the contact to update. Use list_contacts to find this. Example: "64b7f3c2e4b0a1234567890a".'),
      name: z.string().optional().describe('Updated full name.'),
      designation: z.string().optional().describe('Updated designation or title.'),
      image: z.string().optional().describe('New URL for the contact\'s profile photo.'),
      category: categoryEnum.optional().describe(`Updated category. Must be one of: ${VALID_CATEGORIES.join(', ')}.`),
      department: z.string().optional().describe('Updated department name.'),
      description: z.string().optional().describe('Updated description text.'),
      priority: z.number().optional().describe('Updated priority number. Higher = appears first within category.'),
      linkedin: z.string().optional().describe('New LinkedIn URL. Only updates linkedin, leaves other social links unchanged.'),
      mailId: z.string().optional().describe('New email address. Only updates mailId, leaves other social links unchanged.'),
      phoneNo: z.string().optional().describe('New phone number. Only updates phoneNo, leaves other social links unchanged.')
    },
    async ({ id, linkedin, mailId, phoneNo, ...updates }) => {
      try {
        if (linkedin !== undefined) updates['socialLinks.linkedin'] = linkedin;
        if (mailId !== undefined) updates['socialLinks.mailId'] = mailId;
        if (phoneNo !== undefined) updates['socialLinks.phoneNo'] = phoneNo;

        const contact = await Contacts.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (!contact) return { content: [{ type: 'text', text: `Contact "${id}" not found. Use list_contacts to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Contact updated successfully:\n${JSON.stringify(contact, null, 2)}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error updating contact: ${err.message}` }], isError: true };
      }
    }
  );

  server.tool(
    'delete_contact',
    `Permanently deletes a contact person from the SWB directory by their MongoDB ObjectId. This action is irreversible.
Use list_contacts first to confirm the contact exists and to obtain their _id.
Returns a success message on deletion, or an error if the contact was not found.

⚠️ Warning: This permanently removes the contact and all associated data (social links, designation, etc.).`,
    {
      id: z.string().describe('The MongoDB ObjectId (_id) of the contact to permanently delete. Use list_contacts to find this value before deleting.')
    },
    async ({ id }) => {
      try {
        const contact = await Contacts.findByIdAndDelete(id);
        if (!contact) return { content: [{ type: 'text', text: `Contact "${id}" not found. Use list_contacts to see all valid IDs.` }], isError: true };
        return { content: [{ type: 'text', text: `Contact "${contact.name}" (${contact.designation}, id: ${id}) has been permanently deleted.` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error deleting contact: ${err.message}` }], isError: true };
      }
    }
  );
};
