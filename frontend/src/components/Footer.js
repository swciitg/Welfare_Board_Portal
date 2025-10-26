import React from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";
import swbLogo from "../assets/swb_logo.png";
import swcLogo from "../assets/swc_logo.jpg";
import { useHomePageData } from "../hooks/useHomePageData";

function Footer() {
  const socialUrls = {
    linkedin: "https://www.linkedin.com/company/students-welfare-board/",
    instagram: "https://www.instagram.com/swb_iitg?igsh=aTdoenF5MXFxdmM5",
    youtube: "https://youtube.com/@swbiitg?si=ubAv3kXDC9l72m_g",
  };
  const { data } = useHomePageData();

  const SocialIcon = ({ href, icon, hoverClass }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={`text-2xl text-gray-400 transition-colors duration-300 ${hoverClass}`}
    >
      {icon}
    </a>
  );

  return (
    <footer className="bg-gray-900 text-gray-200 font-poppins">
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Left Section: Branding and Contact */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img
                src={data?.homepage[0]?.logoimgurl || swbLogo}
                alt="Students Welfare Board"
                className="h-16 md:h-20"
              />
              <div>
                <h1 className="font-extrabold text-xl md:text-2xl tracking-wide">
                  STUDENT'S WELFARE BOARD
                </h1>
                <p className="text-sm text-gray-400">IIT Guwahati</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              <p>New SAC Building, IIT Guwahati</p>
              <p>Guwahati, Assam - 781039</p>
              <p>+91-361-258162</p>
              <p>gensec_welfare@iitg.ac.in</p>
            </div>
          </div>

          {/* Right Section: Social and Maintained by */}
          <div className="flex flex-col gap-8 items-start md:items-end">
            <div className="flex flex-col items-start md:items-end gap-4">
              <h3 className="font-bold text-lg">Follow Us</h3>
              <div className="flex gap-6">
                <SocialIcon
                  href={socialUrls.linkedin}
                  icon={<FaLinkedinIn />}
                  hoverClass="hover:text-[#0077B5]"
                />
                <SocialIcon
                  href={socialUrls.instagram}
                  icon={<IoLogoInstagram />}
                  hoverClass="hover:text-[#cd486b]"
                />
                <SocialIcon
                  href={socialUrls.youtube}
                  icon={<BsYoutube />}
                  hoverClass="hover:text-[#FF0000]"
                />
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <h3 className="font-bold text-lg">Maintained By</h3>
              <div className="flex items-center gap-3">
                <img
                  className="h-12 rounded-md"
                  src={swcLogo}
                  alt="Students Web Committee"
                />
                <div className="text-sm text-gray-400 text-left md:text-right">
                  <p>Students' Web Committee</p>
                  <p>IIT Guwahati</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Students' Welfare Board, IIT
            Guwahati. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

