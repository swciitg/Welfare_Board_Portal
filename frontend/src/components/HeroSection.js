import useRoundedStyle from "../hooks/useRoundedStyle";
import { useHomePageData } from "../hooks/useHomePageData";
import { Link } from "react-router-dom";

function HeroSection() {
  const roundedStyle = useRoundedStyle();
  const { data, error } = useHomePageData();

  const teamMember = data ? data.teamMember : [];

  console.log("teamMember", teamMember);

  return (
    <div className="w-full overflow-x-hidden font-poppins flex flex-col items-center">
      {/* Hero Section with Minimal Gradient */}
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 sticky top-0 z-0 relative"
        style={{ backgroundImage: `url(${data?.homepage[0]?.heroimage})` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center">
          <p className="text-4xl md:text-7xl font-bold tracking-tight text-center drop-shadow-2xl animate-fade-in">
            Students' Welfare Board
          </p>
          <div className="w-32 h-1 bg-[#7BB9C4] mx-auto mt-6 rounded-full"></div>
        </div>
      </div>
      {/* Floating counsellor card between hero and about */}
      <div className="w-full flex justify-center relative z-20 px-4 mt-8 md:mt-12 lg:mt-16">
        <div className="max-w-[980px] w-full">
          <div className="mx-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7BB9C4] to-[#6ba8b3] flex items-center justify-center text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0C0D0D]">Need help? Consult a counsellor</p>
                <p className="text-xs sm:text-sm text-gray-500">Confidential support for students — available to all.</p>
              </div>

              <div className="flex-shrink-0">
                <Link to="/counsellors" className="inline-flex items-center justify-center px-4 py-2 bg-[#7BB9C4] hover:bg-[#6aa9ad] text-white font-medium rounded-lg shadow-md transition-colors duration-200">
                  Talk to Counsellor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Clean Design */}
      <div
        style={roundedStyle}
        className="md:top-[-100px] top-0 mt-8 md:mt-0 w-full min-h-[975px] flex items-center justify-center bg-[#F5F5F5] text-center relative z-10"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#7BB9C4]/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#7BB9C4]/10 rounded-full"></div>

        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 px-6">
          {/* Enhanced Image Section */}
          <div className="w-full md:w-[460px] h-[470px] basis-1/2 relative group">
            <div className="absolute inset-0 bg-[#7BB9C4] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={data?.aboutData[0]?.image}
              alt="Sports activity"
              className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Enhanced Text Section */}
          <div className="text-left basis-1/2 space-y-6">
            <div className="relative">
              <h1 className="text-[#0C0D0D] font-bold text-6xl md:text-8xl leading-none font-[Fira Sans Extra Condensed] relative">
                ABOUT US<span className="text-[#7BB9C4]">.</span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-[#7BB9C4] rounded-full"></div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <p className="text-[#565656] text-base leading-relaxed font-[Familjen Grotesk]">
                {data?.aboutData[0]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section with Clean Cards - FIXED SPACING */}
  <div className="relative bg-white w-full px-4 sm:px-6 md:px-10 lg:px-20 py-20 md:py-32 space-y-28 md:space-y-36 z-30 md:mt-[-200px] mt-8 mb-24 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#7BB9C4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#7BB9C4] rounded-full blur-3xl"></div>
        </div>

        {/* Chairman Section - Photo LEFT */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative group">
          {/* Enhanced Background */}
          <div className="absolute bg-[#7BB9C4] rounded-3xl shadow-2xl w-[300px] h-[420px] lg:w-[450px] lg:h-[580px] top-0 left-0 hidden lg:block transform rotate-2 group-hover:rotate-1 transition-all duration-700 opacity-90"></div>

          {/* Enhanced Image Section */}
          <div className="z-10 w-full lg:w-[50%] flex items-center justify-center mb-8 lg:mb-0">
            <div className="relative group/img">
              {/* Subtle glow */}
              <div className="absolute -inset-3 bg-[#7BB9C4] rounded-2xl opacity-20 group-hover/img:opacity-30 blur transition-all duration-500"></div>

              <img
                src={data?.homepage[0]?.chairmanimgurl}
                alt="Chairman"
                className="relative w-full max-w-[380px] lg:max-w-[420px] h-[320px] lg:h-[480px] object-cover rounded-2xl shadow-2xl transform group-hover/img:scale-105 transition-all duration-500 border-4 border-white"
              />

              <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover/img:bg-black/20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="w-full lg:w-[50%] text-center lg:text-left flex flex-col items-center lg:items-start justify-start space-y-8">
            <div className="relative mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed] tracking-tight">
                CHAIRPERSON 1<span className="text-[#7BB9C4]">.</span>
              </h1>
              <div className="absolute -bottom-4 left-0 w-28 lg:w-36 h-2 bg-[#7BB9C4] rounded-full"></div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-6 w-full max-w-2xl transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl xl:text-4xl leading-tight text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
                  {data?.homepage[0]?.chairmanname}
                </p>
                <div className="w-20 h-1 bg-[#7BB9C4] rounded-full"></div>
              </div>

              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] mb-8">
                {data?.homepage[0]?.chairmandescription}
              </p>

              <div className="border-l-4 border-[#7BB9C4] pl-6 space-y-4 mt-8">
                <h2 className="text-lg md:text-xl xl:text-2xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk]">
                  Message from the Chairman—
                </h2>
                <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
                  {data?.homepage[0]?.aboutchairman}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vice Chairman Section - Photo RIGHT */}
        <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 relative group">
          {/* Enhanced Background */}
          <div className="absolute bg-[#7BB9C4] rounded-3xl shadow-2xl w-[300px] h-[420px] lg:w-[450px] lg:h-[580px] top-0 right-0 hidden lg:block transform -rotate-2 group-hover:-rotate-1 transition-all duration-700 opacity-90"></div>

          {/* Enhanced Image Section */}
          <div className="z-10 w-full lg:w-[50%] flex items-center justify-center mb-8 lg:mb-0">
            <div className="relative group/img">
              {/* Subtle glow */}
              <div className="absolute -inset-3 bg-[#7BB9C4] rounded-2xl opacity-20 group-hover/img:opacity-30 blur transition-all duration-500  transform group-hover:scale-105"></div>

              <img
                src={`https://swc.iitg.ac.in/welfare-board/api/bidisha_pic.jpg`}
                alt="Vice Chairman"
                className="relative w-full max-w-[380px] lg:max-w-[420px] h-[320px] lg:h-[480px] object-cover rounded-2xl shadow-2xl transform group-hover/img:scale-105 transition-all duration-500 border-4 border-white"
              />

              <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover/img:bg-black/20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="w-full lg:w-[50%] text-center lg:text-left flex flex-col items-center lg:items-start justify-start space-y-8">
            <div className="relative mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed] tracking-tight">
                CHAIRPERSON 2<span className="text-[#7BB9C4]">.</span>
              </h1>
              <div className="absolute -bottom-4 left-0 w-28 lg:w-36 h-2 bg-[#7BB9C4] rounded-full"></div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-6 w-full max-w-2xl transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl xl:text-4xl leading-tight text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
                  Prof. Bidisha Som
                </p>
                <div className="w-20 h-1 bg-[#7BB9C4] rounded-full"></div>
              </div>

              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] mb-8">
                Department of Humanities and Social Sciences, IIT Guwahati
              </p>

              <div className="border-l-4 border-[#7BB9C4] pl-6 space-y-4 mt-8">
                <h2 className="text-lg md:text-xl xl:text-2xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk]">
                  Message from the Vice Chairman—
                </h2>
                <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
                  {data?.homepage[0]?.aboutvicechairman ||
                    "As Chairperson , I am committed to working alongside our team to ensure every student has access to the resources and support they need to thrive academically and personally. Together, we strive to create an inclusive and nurturing environment for all."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* General Secretary Section - Photo LEFT */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative group">
          {/* Enhanced Background */}
          <div className="absolute bg-[#7BB9C4] rounded-3xl shadow-2xl w-[300px] h-[420px] lg:w-[450px] lg:h-[580px] top-0 left-0 hidden lg:block transform rotate-2 group-hover:rotate-1 transition-all duration-700 opacity-90"></div>

          {/* Enhanced Image Section */}
          <div className="z-10 w-full lg:w-[50%] flex items-center justify-center mb-8 lg:mb-0">
            <div className="relative group/img">
              {/* Subtle glow */}
              <div className="absolute -inset-3 bg-[#7BB9C4] rounded-2xl opacity-20 group-hover/img:opacity-30 blur transition-all duration-500"></div>

              <img
                src={data?.homepage[0]?.gensecimg}
                alt="General Secretary"
                className="relative w-full max-w-[380px] lg:max-w-[420px] h-[320px] lg:h-[480px] object-cover rounded-2xl shadow-2xl transform group-hover/img:scale-105 transition-all duration-500 border-4 border-white"
              />

              <div className="absolute inset-0 bg-black/10 rounded-2xl group-hover/img:bg-black/20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="w-full lg:w-[50%] text-center lg:text-left flex flex-col items-center lg:items-start justify-start space-y-8">
            <div className="relative mb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed] tracking-tight">
                GENERAL SECRETARY<span className="text-[#7BB9C4]">.</span>
              </h1>
              <div className="absolute -bottom-4 left-0 w-28 lg:w-36 h-2 bg-[#7BB9C4] rounded-full"></div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-6 w-full max-w-2xl transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
              <div className="space-y-4">
                <p className="text-2xl lg:text-3xl xl:text-4xl leading-tight text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
                  {data?.homepage[0]?.gensecname}
                </p>
                <div className="w-20 h-1 bg-[#7BB9C4] rounded-full"></div>
              </div>

              <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] mb-8">
                {data?.homepage[0]?.gensecdescription}
              </p>

              <div className="border-l-4 border-[#7BB9C4] pl-6 space-y-4 mt-8">
                <h2 className="text-lg md:text-xl xl:text-2xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk]">
                  Message from the General Secretary—
                </h2>
                <p className="text-base md:text-lg xl:text-xl leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
                  {data?.homepage[0]?.aboutgensec}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section - FIXED SPACING AND EVEN LAYOUT */}
      <div
        className="relative bg-gradient-to-br from-[#7BB9C4] via-[#6ba8b3] to-[#5a9aa5] w-full px-4 sm:px-6 md:px-10 lg:px-20 py-24 z-20 mb-[100px]"
        style={roundedStyle}
      >
        {/* Enhanced decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full -translate-y-32 md:-translate-y-48 translate-x-32 md:translate-x-48 animate-pulse mb-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full translate-y-24 md:translate-y-32 -translate-x-24 md:-translate-x-32 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-[#FFD700]/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full animate-pulse delay-500"></div>

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 relative z-10 mt-10">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-[Fira Sans Extra Condensed] drop-shadow-2xl mb-4">
              Team Members
              <span className="text-[#FFD700] animate-pulse">.</span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full shadow-lg"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 translate-x-2 w-16 md:w-24 h-0.5 bg-[#FFD700]/50 rounded-full"></div>
          </div>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-6">
            Meet the dedicated individuals who drive our mission forward with
            passion and excellence.
          </p>
        </div>

        {/* Responsive Grid Layout with even spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto relative z-10">
          {teamMember &&
            teamMember.map((member, index) => (
              <div key={index} className="group relative">
                {/* Card Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-1 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    {/* Background accent */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500 z-0"></div>

                    {/* Main image */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 z-10 border-2 border-white/20"
                    />

                    {/* Gradient overlay - Always visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-100 transition-opacity duration-500 z-20"></div>

                    {/* Member info overlay - visible on sm+; mobile uses separate block below */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-30 hidden sm:block">
                      <h3 className="font-bold text-lg mb-1 drop-shadow-lg">
                        {member.name}
                      </h3>
                      <p className="text-sm opacity-90 font-medium">
                        {member.role}
                      </p>
                      <p className="text-xs opacity-75">{member.department}</p>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none z-5"></div>
                  </div>

                  {/* Card Content (Always visible on mobile) - Keep as is */}
                  <div className="px-4 pb-4 sm:hidden">
                    <h3 className="text-white font-bold text-lg mb-2 truncate">
                      {member.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-1 truncate">
                      {member.role}
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      {member.department}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
