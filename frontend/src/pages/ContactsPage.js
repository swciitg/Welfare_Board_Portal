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
        name: "Prof. Rajesh Kumar",
        designation: "Chairman",
        department: "Department of Computer Science",
        email: "chairman@iitg.ac.in",
        phone: "+91 98765 43210",
        linkedin: "https://linkedin.com/in/rajeshkumar",
        image: "/api/placeholder/300/300",
        description: "Leading the Students' Welfare Board with dedication to student development and campus life enhancement."
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        designation: "Vice Chairman",
        department: "Department of Mechanical Engineering",
        email: "vicechairman@iitg.ac.in",
        phone: "+91 98765 43211",
        linkedin: "https://linkedin.com/in/priyasharma",
        image: "/api/placeholder/300/300",
        description: "Supporting student welfare initiatives and fostering a positive campus environment."
      }
    ],
    coreTeam: [
      {
        id: 3,
        name: "Arjun Patel",
        designation: "General Secretary",
        department: "B.Tech Computer Science, 3rd Year",
        email: "gensec@iitg.ac.in",
        phone: "+91 98765 43212",
        linkedin: "https://linkedin.com/in/arjunpatel",
        image: "/api/placeholder/300/300",
        description: "Coordinating all student welfare activities and representing student interests."
      },
      {
        id: 4,
        name: "Sneha Gupta",
        designation: "Overall Coordinator",
        department: "B.Tech Electrical Engineering, 3rd Year",
        email: "coordinator@iitg.ac.in",
        phone: "+91 98765 43213",
        linkedin: "https://linkedin.com/in/snehagupta",
        image: "/api/placeholder/300/300",
        description: "Managing overall coordination of student welfare programs and events."
      },
      {
        id: 5,
        name: "Rahul Singh",
        designation: "Events Head",
        department: "B.Tech Mechanical Engineering, 3rd Year",
        email: "events@iitg.ac.in",
        phone: "+91 98765 43214",
        linkedin: "https://linkedin.com/in/rahulsingh",
        image: "/api/placeholder/300/300",
        description: "Organizing and managing all student welfare events and activities."
      }
    ],
    departmentHeads: [
      {
        id: 6,
        name: "Ananya Reddy",
        designation: "Design Head",
        department: "B.Tech Design, 2nd Year",
        email: "design@iitg.ac.in",
        phone: "+91 98765 43215",
        linkedin: "https://linkedin.com/in/ananyareddy",
        image: "/api/placeholder/300/300",
        description: "Leading creative design initiatives for student welfare programs."
      },
      {
        id: 7,
        name: "Vikram Joshi",
        designation: "MBR Head",
        department: "B.Tech Civil Engineering, 3rd Year",
        email: "mbr@iitg.ac.in",
        phone: "+91 98765 43216",
        linkedin: "https://linkedin.com/in/vikramjoshi",
        image: "/api/placeholder/300/300",
        description: "Managing student welfare resources and facilities."
      },
      {
        id: 8,
        name: "Pooja Agarwal",
        designation: "Marketing Head",
        department: "B.Tech Electronics, 2nd Year",
        email: "marketing@iitg.ac.in",
        phone: "+91 98765 43217",
        linkedin: "https://linkedin.com/in/poojaagarwal",
        image: "/api/placeholder/300/300",
        description: "Promoting student welfare initiatives and managing communications."
      },
      {
        id: 9,
        name: "Riya Kapoor",
        designation: "Girl Representative",
        department: "B.Tech Chemical Engineering, 3rd Year",
        email: "girlrep@iitg.ac.in",
        phone: "+91 98765 43218",
        linkedin: "https://linkedin.com/in/riyakapoor",
        image: "/api/placeholder/300/300",
        description: "Representing and addressing concerns of female students on campus."
      }
    ],
    clubSecretaries: [
      {
        id: 10,
        name: "Amit Kumar",
        designation: "Sports Club Secretary",
        department: "B.Tech Mechanical, 2nd Year",
        email: "sports@iitg.ac.in",
        phone: "+91 98765 43219",
        image: "/api/placeholder/300/300"
      },
      {
        id: 11,
        name: "Neha Sharma",
        designation: "Cultural Club Secretary",
        department: "B.Tech CSE, 2nd Year",
        email: "cultural@iitg.ac.in",
        phone: "+91 98765 43220",
        image: "/api/placeholder/300/300"
      },
      {
        id: 12,
        name: "Rohit Verma",
        designation: "Technical Club Secretary",
        department: "B.Tech EEE, 3rd Year",
        email: "technical@iitg.ac.in",
        phone: "+91 98765 43221",
        image: "/api/placeholder/300/300"
      },
      {
        id: 13,
        name: "Priya Singh",
        designation: "Literary Club Secretary",
        department: "B.Tech Civil, 2nd Year",
        email: "literary@iitg.ac.in",
        phone: "+91 98765 43222",
        image: "/api/placeholder/300/300"
      },
      {
        id: 14,
        name: "Karan Malhotra",
        designation: "Photography Club Secretary",
        department: "B.Tech Chemical, 3rd Year",
        email: "photography@iitg.ac.in",
        phone: "+91 98765 43223",
        image: "/api/placeholder/300/300"
      },
      {
        id: 15,
        name: "Sakshi Gupta",
        designation: "Dance Club Secretary",
        department: "B.Tech Design, 2nd Year",
        email: "dance@iitg.ac.in",
        phone: "+91 98765 43224",
        image: "/api/placeholder/300/300"
      },
      {
        id: 16,
        name: "Aryan Jain",
        designation: "Music Club Secretary",
        department: "B.Tech Electronics, 3rd Year",
        email: "music@iitg.ac.in",
        phone: "+91 98765 43225",
        image: "/api/placeholder/300/300"
      },
      {
        id: 17,
        name: "Divya Patel",
        designation: "Art Club Secretary",
        department: "B.Tech Mechanical, 2nd Year",
        email: "art@iitg.ac.in",
        phone: "+91 98765 43226",
        image: "/api/placeholder/300/300"
      }
    ],
    hostelSecretaries: [
      {
        id: 18,
        name: "Aditya Sharma",
        designation: "Kameng Hostel Secretary",
        department: "B.Tech CSE, 3rd Year",
        email: "kameng@iitg.ac.in",
        phone: "+91 98765 43227",
        image: "/api/placeholder/300/300"
      },
      {
        id: 19,
        name: "Manish Kumar",
        designation: "Subansiri Hostel Secretary",
        department: "B.Tech Mechanical, 2nd Year",
        email: "subansiri@iitg.ac.in",
        phone: "+91 98765 43228",
        image: "/api/placeholder/300/300"
      },
      {
        id: 20,
        name: "Rajesh Gupta",
        designation: "Dihing Hostel Secretary",
        department: "B.Tech EEE, 3rd Year",
        email: "dihing@iitg.ac.in",
        phone: "+91 98765 43229",
        image: "/api/placeholder/300/300"
      },
      {
        id: 21,
        name: "Suresh Patel",
        designation: "Dibang Hostel Secretary",
        department: "B.Tech Civil, 2nd Year",
        email: "dibang@iitg.ac.in",
        phone: "+91 98765 43230",
        image: "/api/placeholder/300/300"
      },
      {
        id: 22,
        name: "Deepak Singh",
        designation: "Lohit Hostel Secretary",
        department: "B.Tech Chemical, 3rd Year",
        email: "lohit@iitg.ac.in",
        phone: "+91 98765 43231",
        image: "/api/placeholder/300/300"
      },
      {
        id: 23,
        name: "Vikash Joshi",
        designation: "Siang Hostel Secretary",
        department: "B.Tech Design, 2nd Year",
        email: "siang@iitg.ac.in",
        phone: "+91 98765 43232",
        image: "/api/placeholder/300/300"
      },
      {
        id: 24,
        name: "Ankit Verma",
        designation: "Brahmaputra Hostel Secretary",
        department: "B.Tech Electronics, 3rd Year",
        email: "brahmaputra@iitg.ac.in",
        phone: "+91 98765 43233",
        image: "/api/placeholder/300/300"
      },
      {
        id: 25,
        name: "Ravi Kumar",
        designation: "Manas Hostel Secretary",
        department: "B.Tech Mechanical, 2nd Year",
        email: "manas@iitg.ac.in",
        phone: "+91 98765 43234",
        image: "/api/placeholder/300/300"
      },
      {
        id: 26,
        name: "Priya Reddy",
        designation: "Married Scholars Hostel Secretary",
        department: "PhD Computer Science",
        email: "msh@iitg.ac.in",
        phone: "+91 98765 43235",
        image: "/api/placeholder/300/300"
      },
      {
        id: 27,
        name: "Kavya Sharma",
        designation: "Dhansiri Hostel Secretary",
        department: "B.Tech CSE, 3rd Year",
        email: "dhansiri@iitg.ac.in",
        phone: "+91 98765 43236",
        image: "/api/placeholder/300/300"
      },
      {
        id: 28,
        name: "Shreya Gupta",
        designation: "Barak Hostel Secretary",
        department: "B.Tech EEE, 2nd Year",
        email: "barak@iitg.ac.in",
        phone: "+91 98765 43237",
        image: "/api/placeholder/300/300"
      },
      {
        id: 29,
        name: "Anjali Patel",
        designation: "Umiam Hostel Secretary",
        department: "B.Tech Civil, 3rd Year",
        email: "umiam@iitg.ac.in",
        phone: "+91 98765 43238",
        image: "/api/placeholder/300/300"
      },
      {
        id: 30,
        name: "Meera Singh",
        designation: "Kapili Hostel Secretary",
        department: "B.Tech Chemical, 2nd Year",
        email: "kapili@iitg.ac.in",
        phone: "+91 98765 43239",
        image: "/api/placeholder/300/300"
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
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-white relative"
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
                title="Leadership" 
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
                title="Core Team" 
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
              <SectionHeader 
                title="Department Heads" 
                icon={FaBuilding}
                description="Specialized department heads managing various aspects of student welfare"
              />
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
                  Emergency Helpline: +91 98765 43210
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
