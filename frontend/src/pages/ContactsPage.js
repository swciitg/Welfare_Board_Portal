import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaUser, FaUsers, FaBuilding } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { useContactsData } from "../hooks/useContactsData";

function ContactsPage() {
  const { data: contactData, loading, error } = useContactsData();
  const imgdata = contactData?.homepage?.[0]?.contactpageimgurl || "";

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7BB9C4] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading contacts...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading contacts: {error}</p>
        </div>
      </div>
    );
  }

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
            {contactData?.chairpersons && contactData.chairpersons.length > 0 && (
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
            )}

            {/* Core Team Section - GenSec elevated */}
            {contactData?.coreTeam && contactData.coreTeam.length > 0 && (
              <section className="mb-20">
                <SectionHeader 
                  title="Board Members" 
                  icon={FaUser}
                  description="The dedicated core team managing student welfare activities"
                />
                <div className="relative max-w-5xl mx-auto">
                  {/* General Secretary - Elevated Position */}
                  {contactData.coreTeam[0] && (
                    <div className="flex justify-center mb-8">
                      <div className="w-full max-w-sm transform -translate-y-4">
                        <ContactCard contact={contactData.coreTeam[0]} />
                      </div>
                    </div>
                  )}
                  
                  {/* Overall Coordinator and Events Head - Side by Side Below */}
                  {contactData.coreTeam.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      {contactData.coreTeam.slice(1).map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Department Heads Section */}
            {contactData?.departmentHeads && contactData.departmentHeads.length > 0 && (
              <section className="mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {contactData.departmentHeads.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                  ))}
                </div>
              </section>
            )}

            {/* Club Secretaries Section */}
            {contactData?.clubSecretaries && contactData.clubSecretaries.length > 0 && (
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
            )}

            {/* Hostel Welfare Secretaries Section */}
            {contactData?.hostelSecretaries && contactData.hostelSecretaries.length > 0 && (
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
            )}

            {/* Emergency & Ragging Contact Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emergency Contact Section */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-red-800 mb-4">
                  Emergency Contact
                </h3>
                <p className="text-red-700 mb-4">
                  For urgent student welfare matters, please contact our
                  emergency helpline:
                </p>
                <div className="flex flex-col gap-4">
                  {contactData?.emergency && contactData.emergency.length > 0 ? (
                    contactData.emergency.map((contact) => (
                      <div key={contact.id} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                          href={`tel:${contact.phone}`}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <FaPhone />
                          {contact.name}: {contact.phone}
                        </a>
                        <span className="text-red-600 font-medium">
                          Available 24/7
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="tel:+917396799357"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <FaPhone />
                        Emergency Helpline: +91 7396799357
                      </a>
                      <span className="text-red-600 font-medium">
                        Available 24/7
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Anti-Ragging Contact Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  Anti-Ragging Helpline
                </h3>
                <p className="text-blue-700 mb-4">
                  If you face or witness any ragging incident, please reach out
                  immediately for confidential support:
                </p>
                <div className="flex flex-col gap-4">
                  {contactData?.antiRagging && contactData.antiRagging.length > 0 ? (
                    contactData.antiRagging.map((contact) => (
                      <div key={contact.id} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                          href={`tel:${contact.phone}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <FaPhone />
                          {contact.name}: {contact.phone}
                        </a>
                        <span className="text-blue-600 font-medium">
                          24/7 Confidential Support
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="tel:+918001805522"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <FaPhone />
                        Helpline: 1800-180-5522
                      </a>
                      <span className="text-blue-600 font-medium">
                        24/7 Confidential Support
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
