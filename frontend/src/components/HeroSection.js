import useRoundedStyle from "../hooks/useRoundedStyle";
import { useHomePageData } from "../hooks/useHomePageData";

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
            Student's Welfare Board
          </p>
          <div className="w-32 h-1 bg-[#7BB9C4] mx-auto mt-6 rounded-full"></div>
        </div>
      </div>

      {/* About Section with Clean Design */}
      <div
        style={roundedStyle}
        className="top-[-100px] w-full min-h-[975px] flex items-center justify-center bg-[#F5F5F5] text-center relative z-10"
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

      {/* Team Members Section - FIXED SPACING AND EVEN LAYOUT */}
      <div
        className="relative bg-gradient-to-br from-[#7BB9C4] via-[#6ba8b3] to-[#5a9aa5] w-full px-4 sm:px-6 md:px-10 lg:px-20 py-24 z-20 mt-[-150px] mb-[100px]"
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
              Team Members<span className="text-[#FFD700] animate-pulse">.</span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full shadow-lg"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 translate-x-2 w-16 md:w-24 h-0.5 bg-[#FFD700]/50 rounded-full"></div>
          </div>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-6">
            Meet the dedicated individuals who drive our mission forward with passion and excellence.
          </p>
        </div>

        {/* Responsive Grid Layout with even spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto relative z-10">
          {teamMember && teamMember.map((member, index) => (
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
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                  
                  {/* Member info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
                    <h3 className="font-bold text-lg mb-1 drop-shadow-lg">{member.name}</h3>
                    <p className="text-sm opacity-90 font-medium">{member.role}</p>
                    <p className="text-xs opacity-75">{member.department}</p>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none z-5"></div>
                </div>

                {/* Card Content (Always visible on mobile) */}
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

      {/* Leadership Section with Clean Cards - FIXED SPACING */}
      <div className="relative bg-white w-full px-4 sm:px-6 md:px-10 lg:px-20 py-20 md:py-32 space-y-20 md:space-y-32 z-30 mt-[-50px] overflow-hidden">
  {/* Chairman Section */}
  <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
    {/* Solid Background for Desktop */}
    <div className="absolute bg-[#7BB9C4] rounded-2xl shadow-2xl w-[280px] h-[380px] md:w-[400px] md:h-[550px] top-0 left-0 hidden md:block" />

    {/* Enhanced Image Section */}
    <div className="z-10 w-full md:w-[50%] flex items-center justify-center">
      <div className="relative group">
        <img
          src={data?.homepage[0]?.chairmanimgurl}
          alt="Chairman"
          className="w-full max-w-[350px] md:max-w-[400px] h-[280px] md:h-[400px] object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
      </div>
    </div>

    {/* Enhanced Text Section */}
    <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-4 md:space-y-6">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          CHAIRMAN<span className="text-[#7BB9C4]">.</span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-20 md:w-24 h-1 bg-[#7BB9C4] rounded-full"></div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 md:space-y-4 w-full max-w-lg md:max-w-none">
        <p className="text-lg md:text-xl xl:text-2xl leading-relaxed text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
          {data?.homepage[0]?.chairmanname}
        </p>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk]">
          {data?.homepage[0]?.chairmandescription}
        </p>
        <h2 className="text-base md:text-lg xl:text-xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk] mt-4 md:mt-6">
          Message from the Chairman—
        </h2>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
          {data?.homepage[0]?.aboutchairman}
        </p>
      </div>
    </div>
  </div>

  {/* General Secretary Section */}
  <div className="w-full flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 relative">
    {/* Solid Background for Desktop */}
    <div className="absolute bg-[#7BB9C4] rounded-2xl shadow-2xl w-[280px] h-[380px] md:w-[400px] md:h-[550px] top-0 right-0 hidden md:block" />

    {/* Enhanced Image Section */}
    <div className="z-10 w-full md:w-[50%] flex items-center justify-center">
      <div className="relative group">
        <img
          src={data?.homepage[0]?.gensecimg}
          alt="General Secretary"
          className="w-full max-w-[350px] md:max-w-[400px] h-[280px] md:h-[400px] object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
      </div>
    </div>

    {/* Enhanced Text Section */}
    <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-4 md:space-y-6">
      <div className="relative">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          GENERAL SECRETARY<span className="text-[#7BB9C4]">.</span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-20 md:w-24 h-1 bg-[#7BB9C4] rounded-full"></div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 md:space-y-4 w-full max-w-lg md:max-w-none">
        <p className="text-lg md:text-xl xl:text-2xl leading-relaxed text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
          {data?.homepage[0]?.gensecname}
        </p>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk]">
          {data?.homepage[0]?.gensecdescription}
        </p>
        <h2 className="text-base md:text-lg xl:text-xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk] mt-4 md:mt-6">
          Message from the General Secretary—
        </h2>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
          {data?.homepage[0]?.aboutgensec}
        </p>
      </div>
    </div>
  </div>

  {/* Vice Chairman Section */}
  <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
    {/* Solid Background for Desktop */}
    <div className="absolute bg-[#7BB9C4] rounded-2xl shadow-2xl w-[280px] h-[380px] md:w-[400px] md:h-[550px] top-0 left-0 hidden md:block" />

    {/* Enhanced Image Section */}
    <div className="z-10 w-full md:w-[50%] flex items-center justify-center">
      <div className="relative group">
        <img
          src={data?.homepage[0]?.vicechairmanimgurl || "/api/placeholder/461/438"}
          alt="Vice Chairman"
          className="w-full max-w-[350px] md:max-w-[400px] h-[280px] md:h-[400px] object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
      </div>
    </div>

    {/* Enhanced Text Section */}
    <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-4 md:space-y-6">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none font-bold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          VICE CHAIRMAN<span className="text-[#7BB9C4]">.</span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-20 md:w-24 h-1 bg-[#7BB9C4] rounded-full"></div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 space-y-3 md:space-y-4 w-full max-w-lg md:max-w-none">
        <p className="text-lg md:text-xl xl:text-2xl leading-relaxed text-[#0C0D0D] font-[Familjen Grotesk] font-semibold">
          {data?.homepage[0]?.vicechairmanname || "Dr. Rajesh Kumar"}
        </p>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk]">
          {data?.homepage[0]?.vicechairmandescription || "Vice Chairman of Students' Welfare Board, dedicated to enhancing student experience and welfare initiatives across the campus."}
        </p>
        <h2 className="text-base md:text-lg xl:text-xl leading-none font-bold text-[#7BB9C4] font-[Familjen Grotesk] mt-4 md:mt-6">
          Message from the Vice Chairman—
        </h2>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-[#565656] font-[Familjen Grotesk] italic">
          {data?.homepage[0]?.aboutvicechairman || "As Vice Chairman, I am committed to working alongside our team to ensure every student has access to the resources and support they need to thrive academically and personally. Together, we strive to create an inclusive and nurturing environment for all."}
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default HeroSection;
