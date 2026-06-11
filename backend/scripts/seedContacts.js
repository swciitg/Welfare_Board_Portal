import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contacts from '../models/contact.js';

dotenv.config();

const url = process.env.MONGO_URI;

const contactData = {
  chairpersons: [
    {
      name: "Prof. Sayan Chakrabarti",
      designation: "Chairperson 1",
      department: "Department of Physics, IIT Guwahati",
      email: "sayan.chakrabarti@iitg.ac.in",
      phone: "0361-2583556",
      image: "https://www.iitg.ac.in/phy/img/faculty_staff/sayan_chakrabarti.jpg",
      description: "Leading the Students' Welfare Board with dedication to student development and campus life enhancement.",
      priority: 10
    },
    {
      name: "Prof. Bidisha Som",
      designation: "Chairperson 2",
      department: "Department of Humanities and Social Sciences, IIT Guwahati",
      email: "bidisha@iitg.ac.in",
      phone: "0361-2582568",
      image: "https://swc.iitg.ac.in/welfare-board/api/bidisha_pic.jpg",
      description: "Supporting student welfare initiatives and fostering a positive campus environment.",
      priority: 9
    }
  ],
  coreTeam: [
    {
      name: "Surbhit Gang",
      designation: "General Secretary",
      department: "B.Tech Civil Engineerin, 4th Year",
      email: "gensec_welfare@iitg.ac.in",
      phone: "+91 82005 37139",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/surbhit_pic_new.jpg",
      description: "Coordinating all student welfare activities and representing student interests.",
      priority: 10
    },
    {
      name: "Shlok Pratap Singh",
      designation: "Overall Coordinator",
      department: "B.Tech Mechanical Engineering, 3rd Year",
      email: "shlok.singh@iitg.ac.in",
      phone: "+91 72071 85274",
      linkedin: "https://www.linkedin.com/in/shlok-pratap-singh-04a26a33a/",
      image: " https://swc.iitg.ac.in/welfare-board/api/shlok_pic.jpg",
      description: "Managing overall coordination of student welfare programs and events.",
      priority: 9
    },
    {
      name: "Aryan Srivastava",
      designation: "Events Head",
      department: "B.Tech BSBE, 3rd Year",
      email: "aryan.srivastava@iitg.ac.in",
      phone: "+91 9839378578",
      linkedin: "https://www.linkedin.com/in/aryansrivastava11/",
      image: "https://swc.iitg.ac.in/welfare-board/api/aryan_new.jpeg",
      description: "Organizing and managing all student welfare events and activities.",
      priority: 8
    }
  ],
  departmentHeads: [
    {
      name: "Pallempati Sharvani",
      designation: "Girl Representative",
      email: "S.pallempati@iitg.ac.in",
      phone: "+91 9848973693",
      linkedin: "https://www.linkedin.com/in/p-sharvani/",
      image: "https://swc.iitg.ac.in/welfare-board/api/sharvani_pallempati.jpg",
      description: "Representing and addressing concerns of female students on campus."
    },
    {
      name: "Jahnavi Priya",
      designation: "Marketing Head",
      email: "p.jahnavi@iitg.ac.in",
      phone: "+91 9693785594",
      linkedin: "https://www.linkedin.com/in/jahnavip1006/",
      image: "https://swc.iitg.ac.in/welfare-board/api/jahnavi_priya.png",
      description: "Managing strategic partnerships, external communications, and promotional coordination for student welfare programs."
    },
    {
      name: "Ashutosh Maurya",
      designation: "Media & Branding Head",
      email: "ashutosh.maurya@iitg.ac.in",
      phone: "+91 8435208455",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/ashutosh_maurya.jpg",
      description: "Promoting student welfare initiatives and managing communications."
    },
    {
      name: "Sudhir Ahari",
      designation: "Design Head",
      email: "a.sudhir@iitg.ac.in",
      phone: "+91 6378920114",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/sudhir.png",
      description: "Leading creative design initiatives for student welfare programs."
    },
    {
      name: "Nehal Aggarwal",
      designation: "Content Head",
      email: "a.nehal@iitg.ac.in",
      phone: "+91 9354519430",
      linkedin: "https://www.linkedin.com/in/nehal-aggarwal-910579395/",
      image: "https://swc.iitg.ac.in/welfare-board/api/nehal_aggarwal.jpeg",
      description: "Writing Welfare through my pen"
    },
    {
      name: "Nitya Gandhi",
      designation: "PR Head",
      email: "g.parthivkumar@iitg.ac.in",
      phone: "+91 8780210778",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/nitya_gandhi.jpeg",
      description: "Managaing Public relation of Students' Welfare board"
    }
  ],
  clubSecretaries: [
    {
      name: "Pallabi Keot",
      designation: "Saathi Secretary",
      email: "k.pallabi@iitg.ac.in",
      phone: "+91 97061 09569",
      image: "https://swc.iitg.ac.in/welfare-board/api/pallabi_pic.jpg"
    },
    {
      name: "Ravi Shekhar Sharma",
      designation: "Academic Initiatives Club Secretary",
      email: "raviss@iitg.ac.in",
      phone: "+91 8764621501",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/ravi_shekhar_sharma.jpg"
    },
    {
      name: "Ritik Raj",
      designation: "Awareness Secretary",
      email: "ritik.raj@iitg.ac.in",
      phone: "+91 6200716689",
      image: "https://swc.iitg.ac.in/welfare-board/api/ritik_raj.jpg"
    },
    {
      name: "Deepesh Potharaju",
      designation: "Tarangini Secretary",
      email: "p.deepesh@iitg.ac.in",
      phone: "+91 7207459849",
      image: "https://swc.iitg.ac.in/welfare-board/api/deepesh_p.jpg"
    },
    {
      name: "Shibangi Paul",
      designation: "Social Service Club Secretary",
      email: "p.shibangi@iitg.ac.in",
      phone: "+91 93653 21834",
      image: "https://swc.iitg.ac.in/welfare-board/api/shibangi_pic.jpeg"
    },
    {
      name: "Devyani",
      designation: "Youth Empowerment Club Secretary",
      email: "devyani@iitg.ac.in",
      phone: "+91 9896243279",
      linkedin: "NA",
      image: "https://swc.iitg.ac.in/welfare-board/api/devyani.jpg"
    },
    {
      name: "Priyanka Yadav",
      designation: "Lambda Secretary",
      email: " y.priyanka@iitg.ac.in",
      phone: "+91 96257 01009",
      image: " https://swc.iitg.ac.in/welfare-board/api/priyanka_yadav.jpg"
    }
  ],
  hostelSecretaries: [
    {
      name: "Harsh Hemant Balgude",
      designation: "Kameng Hostel Secretary",
      email: "h.balgude@iitg.ac.in",
      phone: "+91 82373 70601",
      image: "https://swc.iitg.ac.in/welfare-board/api/kameng_welfy.jpg"
    },
    {
      name: "Deeksha Garg",
      designation: "Subansiri Hostel Secretary",
      email: "deeksha.garg@iitg.ac.in",
      phone: "+91 9079873232",
      image: "https://swc.iitg.ac.in/welfare-board/api/deeksha_garg.png"
    },
    {
      name: "Virendra Ghunawat",
      designation: "Dihing Hostel Secretary",
      email: "v.ghunawat@iitg.ac.in",
      phone: "+91 95214 67460",
      image: "https://swc.iitg.ac.in/welfare-board/api/dihing_welfy.jpeg"
    },
    {
      name: "Nimit Maroo",
      designation: "Lohit Hostel Secretary",
      email: "m.nimit@iitg.ac.in",
      phone: "+91 6367795984",
      image: "https://swc.iitg.ac.in/welfare-board/api/nimit_maroo.png"
    },
    {
      name: "Ansh Pal",
      designation: "Siang Hostel Secretary",
      email: "ansh.pal@iitg.ac.in",
      phone: "+91 9696345530",
      image: " https://swc.iitg.ac.in/welfare-board/api/siang_welfy_.jpg"
    },
    {
      name: "Priyanshu Bhardwaj",
      designation: "Brahmaputra Hostel Secretary",
      email: "p.bhardwaj@iitg.ac.in",
      phone: "+91 9142029326",
      image: "https://swc.iitg.ac.in/welfare-board/api/priyanshu_bhardwaj.png"
    },
    {
      name: "Aditya Prabhakar",
      designation: "Manas Hostel Secretary",
      email: "aditya.prabhakar@iitg.ac.in",
      phone: "+91 9211577556",
      image: "https://swc.iitg.ac.in/welfare-board/api/aditya_prabhakar.png"
    },
    {
      name: "Akshada Gokul Bhamare",
      designation: "Dhansiri Hostel Secretary",
      email: "g.bhamare@iitg.ac.in",
      phone: "+91 9823088141",
      image: "https://swc.iitg.ac.in/welfare-board/api/akshada_bhamare.jpg"
    },
    {
      name: "Chitransh Gupta",
      designation: "Barak Hostel Secretary",
      email: "g.chitransh@iitg.ac.in",
      phone: "+91 8226037201",
      image: "https://swc.iitg.ac.in/welfare-board/api/chitransh_gupta.jpg"
    },
    {
      name: "Sundaram Pandey",
      designation: "Umiam Hostel Secretary",
      email: "p.sundaram@iitg.ac.in",
      phone: "+91 89494 90277",
      image: "https://swc.iitg.ac.in/welfare-board/api/umiam_welfy_.jpeg"
    },
    {
      name: "Subhodeep Paul",
      designation: "Kapili Hostel Secretary",
      email: "p.subhodeep@iitg.ac.in",
      phone: "+91 9678495561",
      image: "https://swc.iitg.ac.in/welfare-board/api/subhodeep_paul.jpeg"
    },
    {
      name: "Lashika Goyal",
      designation: "Disang Hostel Secretary",
      email: "g.lashika@iitg.ac.in",
      phone: "+91 8386843761",
      image: "https://swc.iitg.ac.in/welfare-board/api/lashika_goyal.jpeg"
    },
    {
      name: "Amey Rewanwar",
      designation: "Welfare Secretary",
      email: "a.rewanwar@iitg.ac.in",
      phone: "+91 7558689974",
      image: "https://swc.iitg.ac.in/welfare-board/api/amey_rewanwar.jpeg"
    },
    {
      name: "Chitranjan Kumar Yadav",
      designation: "Welfare Secretary",
      email: "y.chitranjan@iitg.ac.in",
      phone: "+91 9142227599",
      image: "https://swc.iitg.ac.in/welfare-board/api/chitranjan_kumar.jpg"
    }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database for seeding...");

    const count = await Contacts.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} contacts. Skipping seed script.`);
      process.exit(0);
    }

    const contactsToInsert = [];

    const addCategory = (items, category) => {
      // Reverse loop to assign priority if not given (first item gets highest priority)
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        contactsToInsert.push({
          name: item.name,
          designation: item.designation,
          department: item.department || '',
          image: item.image,
          description: item.description || '',
          category: category,
          priority: item.priority !== undefined ? item.priority : (items.length - i),
          socialLinks: {
            linkedin: item.linkedin || 'NA',
            mailId: item.email || '',
            phoneNo: item.phone || ''
          }
        });
      }
    };

    addCategory(contactData.chairpersons, 'Chairpersons');
    addCategory(contactData.coreTeam, 'Core Team');
    addCategory(contactData.departmentHeads, 'Department Heads');
    addCategory(contactData.clubSecretaries, 'Club Secretaries');
    addCategory(contactData.hostelSecretaries, 'Hostel Secretaries');

    await Contacts.insertMany(contactsToInsert);
    console.log(`✅ Seeded ${contactsToInsert.length} contacts successfully.`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
