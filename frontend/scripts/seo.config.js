// Metadata used by scripts/generate-seo.js to build per route static HTML.
// Keep `routes` in sync with the <Route> list in src/App.js.
//
// The two parameterised routes in App.js, "club/:name" and "event/:id", are
// deliberately absent: their content comes from the API at runtime, so there is
// no fixed list of URLs to emit here. Those paths still resolve, because
// `serve -s` falls back to build/index.html for anything without a real file.

const site = {
  origin: 'https://swc.iitg.ac.in',
  // Must match REACT_APP_BASEURL in .env and <BrowserRouter basename> in src/App.js.
  basePath: '/welfare-board',
  name: "Students' Welfare Board, IIT Guwahati",
  organization: "Students' Web Committee, IIT Guwahati",
  locale: 'en_IN',
  // Paths are relative to the public/ folder.
  defaultImage: '/group.jpeg',
  logo: '/swb_logo.png',
};

// `blurb` is rendered into the fallback markup served to clients that do not
// run JavaScript, so it should read as a real sentence about the page.
const routes = [
  {
    path: '/',
    name: 'Home',
    title: "Students' Welfare Board | IIT Guwahati",
    description:
      "The official site of the Students' Welfare Board of IIT Guwahati: counselling support, welfare funds, student clubs, events, food outlets and wellbeing resources on campus.",
    blurb:
      "The Students' Welfare Board of IIT Guwahati works on student wellbeing, offering counselling support, welfare funds, clubs, events and campus resources.",
  },
  {
    path: '/events',
    name: 'Events',
    title: "Events | Students' Welfare Board, IIT Guwahati",
    description:
      "Events organised by the Students' Welfare Board at IIT Guwahati, covering wellbeing, awareness and community activities across the campus.",
    blurb:
      "Events organised by the Students' Welfare Board at IIT Guwahati, spanning wellbeing, awareness and community activities.",
  },
  {
    path: '/clubs',
    name: 'Clubs',
    title: "Clubs | Students' Welfare Board, IIT Guwahati",
    description:
      "Student clubs under the Students' Welfare Board at IIT Guwahati, with details of what each club does and how to get involved.",
    blurb:
      "The student clubs running under the Students' Welfare Board at IIT Guwahati, and how to get involved with them.",
  },
  {
    path: '/counsellors',
    name: 'Counsellors',
    title: "Counsellors | Students' Welfare Board, IIT Guwahati",
    description:
      'Counselling support at IIT Guwahati: the weekly counsellor schedule, in person sessions with licensed professionals, anonymous chat and round the clock confidential support.',
    blurb:
      'Counselling support at IIT Guwahati, including the weekly counsellor schedule, in person sessions with licensed professionals, anonymous secure chat and confidential round the clock support.',
  },
  {
    path: '/resources',
    name: 'Resources',
    title: "Resources | Students' Welfare Board, IIT Guwahati",
    description:
      'Student welfare resources at IIT Guwahati: the Welfare Fund and financial assistance, the Code of Conduct, the Career Cafe podcast series and the YourDOST wellness platform.',
    blurb:
      'Welfare resources at IIT Guwahati, covering the Welfare Fund and financial assistance for deserving students, the student Code of Conduct, the Career Cafe podcast series, and YourDOST, a mental and emotional wellness platform incubated at IIT Guwahati.',
  },
  {
    path: '/foodcourt',
    name: 'Food Outlets',
    title: "Food Outlets | Students' Welfare Board, IIT Guwahati",
    description:
      'Food outlets on the IIT Guwahati campus, including the food court located behind the New SAC (Student Activity Centre), listed by category.',
    blurb:
      'Food outlets on the IIT Guwahati campus, including the food court behind the New SAC (Student Activity Centre), listed by category.',
  },
  {
    path: '/contacts',
    name: 'Contacts',
    title: "Contacts | Students' Welfare Board, IIT Guwahati",
    description:
      "Contact details for the Students' Welfare Board of IIT Guwahati and the people to reach for welfare and counselling support.",
    blurb:
      "How to reach the Students' Welfare Board of IIT Guwahati for welfare and counselling support.",
  },
];

module.exports = { site, routes };
