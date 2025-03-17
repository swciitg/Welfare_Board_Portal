import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaRegFilePdf } from "react-icons/fa6";
import useRoundedStyle from "../hooks/useRoundedStyle";

const sections = [
  {
    title: "Welfare Fund",
    description:
      "IIT Guwahati offers various scholarships and financial assistance programs to support deserving and meritorious students .",
    mediaType: "pdf",
    mediaSrc: "pdfs/swb-funds.pdf",
  },
  {
    title: "Career Cafe",
    description:
      "A podcast series dedicated to guide students on their journey towards professional development. Dive into inspiring stories , expert advice and real world insights to fuel your career journey.",
    mediaType: "iframe",
    mediaSrc: "https://www.youtube.com/embed/dBFxtkRWLcY?si=KWsO-UOzRjIWd97J" ,
  },
  {
    title: "Code of Conduct",
    description:
      "The document details IIT Guwahati's student conduct rules, addressing policy breaches, harassment, safety risks, unauthorized access, and misconduct in residential areas.",
    mediaType: "pdf",
    mediaSrc: "pdfs/code_of_conduct.pdf",
  },
  {
    title: "Process Documentation",
    description:
      "A guide for club secretaries detailing procedures for event approvals, venue bookings, finances, and administrative tasks with required templates and processes.",
    mediaType: "pdf",
    mediaSrc: "pdfs/Welfare_Board_Documentation.pdf",
  },
  {
    title: "YourDOST",
    description:
      "YourDOST, a mental and emotional wellness platform incubated at IIT Guwahati, offers 24/7 counseling support through a network of experts, aiming to address mental health needs with accessibility and anonymity.",
    mediaType: "image",
    mediaSrc: "/YourDost.jpeg",
  },

];

const Section = ({ title, description, mediaType, mediaSrc, isReversed }) => (
    <div
      className={`flex w-full flex-col md:flex-row ${
        isReversed ? "md:flex-row-reverse" : ""
      } my-5 md:my-10 items-center gap-6`}
    >
      {/* Text Section */}
      <div className="md:w-1/2 p-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {title.toUpperCase()}.
        </h2>
        <p className="text-base sm:text-lg">{description}</p>
      </div>
  
      {/* Media Section */}
      <div className="md:w-1/2 p-6 flex justify-center items-center relative h-[320px]">
        {/* Background Block */}
        <div
          className={`absolute w-[60%] h-[130%] top-1/2 -translate-y-1/2 bg-[#7BB9C4] ${
            isReversed ? "left-0" : "right-0"
          } sm:block hidden`}
        />
  
        {/* Media Content */}
        <div className="relative z-10 flex justify-center items-center">
  {mediaType === "pdf" ? (
    <a href={mediaSrc} target="_blank" rel="noreferrer" className="">
      <FaRegFilePdf size={200} className="text-gray-700" />
    </a>
  ) : mediaType === "iframe" ? (
    <iframe
      src={mediaSrc}
      className="w-auto max-w-full h-48 sm:h-64 md:h-64 border rounded-md"
      title={title}
      allowFullScreen
    ></iframe>
  ) : mediaType === "image" ? (
    <a href="https://yourdost.com/" target="_blank" rel="noreferrer">
      <img
        src={mediaSrc}
        alt={title}
        className="w-auto max-w-full h-48 sm:h-64 md:h-64 border rounded-md object-cover"
      />
    </a>
  ) : null}
</div>

      </div>
    </div>
  );

const SWBSections = () => {
  return (
    <div>
      <Header />
      <div
        className="w-full min-h-[100vh] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 text-center px-4"
        style={{ backgroundImage: "url('resource.jpg')" }}
      >
        <p className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
          Resources
        </p>
      </div>

      <div className="container mx-auto px-6 sm:pt-32 mb-20 flex flex-col items-center sm:gap-20">
        {sections.map((section, index) => (
          <Section key={index} {...section} isReversed={index % 2 !== 0} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SWBSections;
