import { registerClubTools }       from './tools/clubs.tools.js';
import { registerEventTools }      from './tools/events.tools.js';
import { registerContactTools }    from './tools/contacts.tools.js';
import { registerCounselorTools }  from './tools/counselors.tools.js';
import { registerBoardInfoTools }  from './tools/boardInfo.tools.js';
import { registerAboutUsTools }    from './tools/aboutUs.tools.js';
import { registerFacilityTools }   from './tools/facilities.tools.js';
import { registerTeamMemberTools } from './tools/teamMembers.tools.js';

export const registerTools = (server) => {
  registerClubTools(server);
  registerEventTools(server);
  registerContactTools(server);
  registerCounselorTools(server);
  registerBoardInfoTools(server);
  registerAboutUsTools(server);
  registerFacilityTools(server);
  registerTeamMemberTools(server);
};