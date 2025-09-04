import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaLinkedin, FaUser, FaUsers, FaBuilding } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { useHomePageData } from "../hooks/useHomePageData";

function ContactsPage() {
  const { data } = useHomePageData();
  const imgdata = data?.homepage[0]?.contactpageimgurl || "";

  // Hardcoded contact data organized by hierarchy
  const contactData = {
    chairpersons: [
      {
        id: 1,
        name: "Prof. Sayan Chakrabarti",
        designation: "Chairperson 1",
        department: "Department of Physics, IIT Guwahati",
        email: "sayan.chakrabarti@iitg.ac.in",
        phone: "0361-2583556",
        image: "https://www.iitg.ac.in/phy/img/faculty_staff/sayan_chakrabarti.jpg",
        description: "Leading the Students' Welfare Board with dedication to student development and campus life enhancement."
      },
      {
        id: 2,
        name: "Prof. Bidisha Som",
        designation: "Chairperson 2",
        department: "Department of Humanities and Social Sciences, IIT Guwahati",
        email: "bidisha@iitg.ac.in",
        phone: "0361-2582568",
        image: "https://swc.iitg.ac.in/welfare-board/api/bidisha_pic.jpg",
        description: "Supporting student welfare initiatives and fostering a positive campus environment."
      }
    ],
    coreTeam: [
      {
        id: 3,
        name: "N Hemanth Kumar",
        designation: "General Secretary",
        department: "B.Tech Computer Science, 4th Year",
        email: "gensec_welfare@iitg.ac.in",
        phone: "+91 73967 99357",
        linkedin: "https://www.linkedin.com/in/hemanth-kumar-n-9bb12a263",
        image: "https://swc.iitg.ac.in/welfare-board/api/gensec_wel.jpg",
        description: "Coordinating all student welfare activities and representing student interests."
      },
      {
        id: 4,
        name: "Mithil Sandhineni",
        designation: "Overall Coordinator",
        department: "B.Tech Mechanical Engineering, 3rd Year",
        email: "m.sandhineni@iitg.ac.in",
        phone: "+91 72071 85274",
        linkedin: "https://www.linkedin.com/in/mithilsandhineni/",
        image: "https://swc.iitg.ac.in/welfare-board/api/mithil_picture.jpg",
        description: "Managing overall coordination of student welfare programs and events."
      },
      {
        id: 5,
        name: "Surbhit Gang",
        designation: "Events Head",
        department: "B.Tech Civil Engineering, 3rd Year",
        email: "surbhitkumar@iitg.ac.in",
        phone: "+91 82005 37139",
        linkedin: "NA",
        image: "https://swc.iitg.ac.in/welfare-board/api/surbhit_pic.jpg",
        description: "Organizing and managing all student welfare events and activities."
      }
    ],
    departmentHeads: [
      {
        id: 6,
        name: "Diya Agarwal",
        designation: "Girl Representative",
        email: "diya.agarwal@iitg.ac.in",
        phone: "+91 88494 76475",
        linkedin: "https://www.linkedin.com/in/diya-agarwal-609005262/",
        image: "https://swc.iitg.ac.in/welfare-board/api/diya_pic.jpg",
        description: "Leading creative design initiatives for student welfare programs."
      },
      {
        id: 7,
        name: "Ayush Mishra",
        designation: "Marketing Head",
        email: "ayush.m@iitg.ac.in",
        phone: "+91 89576 64590",
        linkedin: "https://www.linkedin.com/in/ayush-mishra-602421281/",
        image: "https://swc.iitg.ac.in/welfare-board/api/ayush_pic.jpeg",
        description: "Managing student welfare resources and facilities."
      },
      {
        id: 8,
        name: "Riddha",
        designation: "Design Coordinator",
        email: "s.riddha@iitg.ac.in",
        phone: "+91 6294 014 787",
        linkedin: "https://www.linkedin.com/in/riddha-singh-a07103261/",
        image: "https://swc.iitg.ac.in/welfare-board/api/riddha_pic.jpg",
        description: "Promoting student welfare initiatives and managing communications."
      },
      {
        id: 9,
        name: "Shlok Pratap Singh",
        designation: "Media & Branding Head",
        email: "shlok.singh@iitg.ac.in",
        phone: "+91 99970 01125",
        linkedin: "https://www.linkedin.com/in/shlok-pratap-singh-04a26a33a/",
        image: " https://swc.iitg.ac.in/welfare-board/api/shlok_pic.jpg",
        description: "Representing and addressing concerns of female students on campus."
      }
    ],
    clubSecretaries: [
      {
        id: 10,
        name: "Pallabi Keot",
        designation: "Saathi Secretary",
        email: "k.pallabi@iitg.ac.in",
        phone: "+91 97061 09569",
        image: "https://swc.iitg.ac.in/welfare-board/api/pallabi_pic.jpg"
      },
      {
        id: 11,
        name: "Ravit Chatrath",
        designation: "Academic Initiatives Club Secretary",
        email: "c.ravit@iitg.ac.in",
        phone: "+91 74540 63847",
        image: "https://swc.iitg.ac.in/welfare-board/api/ravit_pic.jpeg"
      },
      {
        id: 12,
        name: "Uthkarsha Srivastava",
        designation: "Awareness Secretary",
        email: "u.shrivastava@iitg.ac.in",
        phone: "+91 73892 47395",
        image: "https://swc.iitg.ac.in/welfare-board/api/utkarsha.jpg"
      },
      {
        id: 13,
        name: "Vaishnavi Agarwal ",
        designation: "Tarangini Secretary",
        email: "a.vaishnavi@iitg.ac.in",
        phone: "+91 89537 62399",
        image: " https://swc.iitg.ac.in/welfare-board/api/vaishnavi.jpg"
      },
      {
        id: 14,
        name: "Shibangi Paul",
        designation: "Social Service Club Secretary",
        email: "p.shibangi@iitg.ac.in",
        phone: "+91 93653 21834",
        image: "https://swc.iitg.ac.in/welfare-board/api/shibangi_pic.jpeg"
      },
      {
        id: 15,
        name: "Sarvagya Tiwari",
        designation: "Youth Empowerment Club Secretary",
        email: "t.sarvagya@iitg.ac.in",
        phone: "+91 82913 14066",
        image: "https://swc.iitg.ac.in/welfare-board/api/sarvagya.jpg"
      },
      {
        id: 16,
        name: "Priyanka Yadav",
        designation: "Lambda Secretary",
        email: " y.priyanka@iitg.ac.in",
        phone: "+91 96257 01009",
        image: " https://swc.iitg.ac.in/welfare-board/api/priyanka_yadav.jpg"
      },
    ],
    hostelSecretaries: [
      {
        id: 18,
        name: "Harsh Hemant Balgude",
        designation: "Kameng Hostel Secretary",
        email: "h.balgude@iitg.ac.in",
        phone: "+91 82373 70601",
        image: "https://swc.iitg.ac.in/welfare-board/api/kameng_welfy.jpg"
      },
      {
        id: 19,
        name: "Eena Dodwani",
        designation: "Subansiri Hostel Secretary",
        email: "eena.dodwani@iitg.ac.in",
        phone: "+91 88271 18164",
        image: "https://swc.iitg.ac.in/welfare-board/api/subansiri_welfy.jpg"
      },
      {
        id: 20,
        name: "Virendra Ghunawat",
        designation: "Dihing Hostel Secretary",
        email: "v.ghunawat@iitg.ac.in",
        phone: "+91 95214 67460",
        image: "https://swc.iitg.ac.in/welfare-board/api/dihing_welfy.jpeg"
      },
      {
        id: 22,
        name: "Chirag Agarwal",
        designation: "Lohit Hostel Secretary",
        email: "c.agarwal@iitg.ac.in",
        phone: "+91 70149 62887",
        image: "https://swc.iitg.ac.in/welfare-board/api/lohiit_welfy.jpg"
      },
      {
        id: 23,
        name: "Ansh Pal",
        designation: "Siang Hostel Secretary",
        email: "ansh.pal@iitg.ac.in",
        phone: "+91 9696345530",
        image: " https://swc.iitg.ac.in/welfare-board/api/siang_welfy_.jpg"
      },
      {
        id: 24,
        name: "Paras Katiyar",
        designation: "Brahmaputra Hostel Secretary",
        email: "paras.katiyar@iitg.ac.in ",
        phone: "+91 6387 843 598",
        image: " https://swc.iitg.ac.in/welfare-board/api/bramha_welfy.jpg"
      },
      {
        id: 25,
        name: " Yogesh Bhanwaria",
        designation: "Manas Hostel Secretary",
        email: "y.bhanwaria@iitg.ac.in",
        phone: "+91 73576 58751",
        image: "https://swc.iitg.ac.in/welfare-board/api/manas_welfy.jpg"
      },
      {
        id: 27,
        name: "Devyani",
        designation: "Dhansiri Hostel Secretary",
        email: "devyani@iitg.ac.in",
        phone: "+91  98962 43279",
        image: " https://swc.iitg.ac.in/welfare-board/api/dhansiri_welfy_.jpeg"
      },
      {
        id: 28,
        name: "Deepak",
        designation: "Barak Hostel Secretary",
        email: "barak@iitg.ac.in",
        phone: "+91 96436 53678",
        image: "https://swc.iitg.ac.in/welfare-board/api/barak_welfy.jpg"
      },
      {
        id: 29,
        name: "Sundaram Pandey",
        designation: "Umiam Hostel Secretary",
        email: "p.sundaram@iitg.ac.in",
        phone: "+91 89494 90277",
        image: "https://swc.iitg.ac.in/welfare-board/api/umiam_welfy_.jpeg"
      },
      {
        id: 30,
        name: "Sulabh Napit",
        designation: "Kapili Hostel Secretary",
        email: "n.sulabh@iitg.ac.in",
        phone: "+91 83198 55908",
        image: "https://swc.iitg.ac.in/welfare-board/api/kapili_welfy.jpeg"
      }
    ]
  };

  const ContactCard = ({ contact, isLarge = false }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
      <div className="relative">
        <img 
          src={contact.image} 
          alt={contact.name}
          className={`w-full object-cover ${isLarge ? 'h-80' : 'h-64'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className={`font-bold ${isLarge ? 'text-2xl' : 'text-xl'} mb-1`}>{contact.name}</h3>
          <p className={`${isLarge ? 'text-base' : 'text-sm'} opacity-90 font-medium`}>{contact.designation}</p>
          <p className={`${isLarge ? 'text-sm' : 'text-xs'} opacity-75`}>{contact.department}</p>
        </div>
      </div>
      
      <div className="p-6">
        {contact.description && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {contact.description}
          </p>
        )}
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <FaPhone className="text-[#7BB9C4] flex-shrink-0" />
            <a href={`tel:${contact.phone}`} className="text-sm hover:text-[#7BB9C4] transition-colors">
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MdEmail className="text-[#7BB9C4] flex-shrink-0" />
            <a href={`mailto:${contact.email}`} className="text-sm hover:text-[#7BB9C4] transition-colors break-all">
              {contact.email}
            </a>
          </div>
          {contact.linkedin && (
            <div className="flex items-center gap-3 text-gray-600">
              <FaLinkedin className="text-[#7BB9C4] flex-shrink-0" />
              <a 
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-[#7BB9C4] transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <a
            href={`tel:${contact.phone}`}
            className="flex-1 bg-[#7BB9C4] hover:bg-[#6ba8b3] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <FaPhone className="text-xs" />
            Call
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <FaEnvelope className="text-xs" />
            Email
          </a>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, icon: Icon, description }) => (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icon className="text-[#7BB9C4] text-3xl" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div>
      <Header />
      <div className="overflow-hidden font-poppins flex flex-col">
  {/* Hero Section */}
  <div
    className="w-full h-[865px] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-white relative"
    style={{ backgroundImage: `url(${imgdata})` }}
  >
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 text-center">
      <p className="text-4xl md:text-7xl font-bold tracking-tight text-center drop-shadow-2xl mb-4">
        GET IN TOUCH
      </p>
      <p className="text-lg md:text-xl tracking-tight text-center opacity-90 max-w-2xl mx-auto">
        In case you have any queries, don't hesitate to reach out to us. Our dedicated team is here to help you.
      </p>
    </div>
  </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Chairpersons Section - Side by Side */}
            <section className="mb-20">
              <SectionHeader 
                title="Chairpersons" 
                icon={FaUsers}
                description="Meet our distinguished chairpersons who guide the Students' Welfare Board"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {contactData.chairpersons.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} isLarge={true} />
                ))}
              </div>
            </section>

            {/* Core Team Section - GenSec elevated */}
            <section className="mb-20">
              <SectionHeader 
                title="Board Members" 
                icon={FaUser}
                description="The dedicated core team managing student welfare activities"
              />
              <div className="relative max-w-5xl mx-auto">
                {/* General Secretary - Elevated Position */}
                <div className="flex justify-center mb-8">
                  <div className="w-full max-w-sm transform -translate-y-4">
                    <ContactCard contact={contactData.coreTeam[0]} />
                  </div>
                </div>
                
                {/* Overall Coordinator and Events Head - Side by Side Below */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <ContactCard contact={contactData.coreTeam[1]} />
                  <ContactCard contact={contactData.coreTeam[2]} />
                </div>
              </div>
            </section>

            {/* Department Heads Section */}
            <section className="mb-20">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactData.departmentHeads.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>

            {/* Club Secretaries Section */}
            <section className="mb-20">
              <SectionHeader 
                title="Club Secretaries" 
                icon={FaUsers}
                description="Secretaries managing various student clubs and activities"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactData.clubSecretaries.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>

            {/* Hostel Welfare Secretaries Section */}
            <section className="mb-20">
              <SectionHeader 
                title="Hostel Welfare Secretaries" 
                icon={FaBuilding}
                description="Dedicated secretaries ensuring welfare in all hostel accommodations"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {contactData.hostelSecretaries.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>

            {/* Emergency Contact Section */}
            <section className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency Contact</h3>
              <p className="text-red-700 mb-4">
                For urgent student welfare matters, please contact our emergency helpline:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:+919876543210" 
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPhone />
                  Emergency Helpline: +91 7396799357
                </a>
                <span className="text-red-600 font-medium">Available 24/7</span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactsPage;
