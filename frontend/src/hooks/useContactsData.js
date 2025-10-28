import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/welfare-board/api';

export const useContactsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/contacts`);
        
        // Organize contacts by category
        const organizedData = {
          chairpersons: [],
          coreTeam: [],
          departmentHeads: [],
          clubSecretaries: [],
          hostelSecretaries: [],
          emergency: [],
          antiRagging: [],
          homepage: response.data.homepage,
        };

        response.data.contacts.forEach(contact => {
          const mappedContact = {
            id: contact._id,
            name: contact.name,
            designation: contact.designation,
            department: contact.department || '',
            email: contact.socialLinks?.mailId || '',
            phone: contact.socialLinks?.phoneNo || '',
            linkedin: contact.socialLinks?.linkedin || '',
            image: contact.image,
            description: contact.description || '',
          };

          switch (contact.category) {
            case 'Chairpersons':
              organizedData.chairpersons.push(mappedContact);
              break;
            case 'Core Team':
              organizedData.coreTeam.push(mappedContact);
              break;
            case 'Department Heads':
              organizedData.departmentHeads.push(mappedContact);
              break;
            case 'Club Secretaries':
              organizedData.clubSecretaries.push(mappedContact);
              break;
            case 'Hostel Secretaries':
              organizedData.hostelSecretaries.push(mappedContact);
              break;
            case 'Emergency':
              organizedData.emergency.push(mappedContact);
              break;
            case 'Anti-Ragging':
              organizedData.antiRagging.push(mappedContact);
              break;
            default:
              console.warn(`Unknown category: ${contact.category}`);
          }
        });

        setData(organizedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError(err.message || 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { data, loading, error };
};
