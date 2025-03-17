import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import useScrollDirection from "../hooks/useScrollDirection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// Import components
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDiv from "../components/RoundedDiv";
import { FaRegFilePdf } from "react-icons/fa6";

const clubData = {
  name: "Welfare Board",
  topSection: {
    img: "/group.jpeg",
  },
  muskan:{
   text:`The Muskaan event by the Student Welfare Board at IIT Guwahati made this Diwali unforgettable for over 120 orphan children from orphanages across Guwahati. The day was a whirlwind of energy and joy, starting with a lively dance session where kids danced their hearts out. They then poured their creativity onto paper during a drawing session, followed by fun games that had everyone laughing and cheering.

The excitement peaked with a spellbinding magic show that left the children awestruck, their faces lit up with wonder. A delicious lunch brought everyone together, and the day ended with the distribution of exciting gifts, sparking pure delight.

It was a celebration filled with laughter, magic, and heartfelt smiles—an experience etched in everyone's memories!`,
   img:"/images/events/muskan.jpeg",
   img2:"/images/events/muskan2.jpeg"
  },

  roobaroo:{
    text:`Roobaroo is the official campus magazine of IIT Guwahati, launched by the Student Welfare Board (SWB) to keep students informed and connected. The first issue, titled "Flicker," features campus updates, future plans, insights into student rights, and stories celebrating community achievements. It aims to foster a sense of community and awareness among students. The magazine is available both digitally through links shared by SWB and in print at hostel magazine stands and key campus locations.`,
    img:"/images/events/roobaroo.jpeg",
    img2:"/images/events/roobaroo2.jpeg",
    img3:"/images/events/roobaroo3.jpeg",
    pdf:"/pdfs/roobaroo.pdf"
  }
,
  foodOutlet: {
    text: `During this tenure, we successfully onboarded several prominent food outlets to enhance the dining experience at our food court. Notable additions include well-known brands like *Domino’s, La Pinoz, Nescafé, Urban Tadka, and Fat Belly*. This diverse lineup offers a wide range of culinary options, from popular pizzas and comforting beverages to authentic Indian cuisine and indulgent treats, catering to varied tastes and preferences.`,
    img: "/images/events/foodOutlet.jpeg",
    img2:"/images/events/foodOutlet2.jpeg",
    img3:"/images/events/foodOutlet3.jpeg"
  },
  prayatna: {
    text: `Prayatna 2025 is the 5th edition of the annual socio-welfare fest of IIT Guwahati, organized by the Students' Welfare Board.

With the vision of promoting social harmony and helping raise awareness about socio-economic issues and their solutions, Prayatna strives to create a meaningful and lasting impact on the lives of the people in the community. `,
    img: "/images/events/prayatna.jpeg",
    img2:"/images/events/prayatna2.jpeg",
    img3:"/images/events/prayatna3.jpeg"
  },
  sahyog:{
    text:`Sahyog, Inter hostel socio-welfare competition is aimed at helping the IITG students develop a sense of compassion and empowerment by exploring their competitive spirit. Sahyog will allow hostels to explore a new side of themselves while competing as a team.

Through this competition, participants can engage in meaningful conversations, brainstorm innovative solutions, and develop strategies to create a more just and equitable world.

Every hostel borderer is encouraged to come forward and take part.`,
img:"/images/events/sahyog.jpeg",
img2:"/images/events/sahyog2.png"
  }
};

function EachEventPage() {
  const scrollDirection = useScrollDirection();

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="overflow-hidden font-poppins flex flex-col">
        {/* Top Section */}
        <div
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200"
          style={{ backgroundImage: `url(${clubData.topSection.img})` }}
        >
          <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
            {clubData.name} 
          </p>
         
        </div>
        {/* Aboutus Section */}
        
        {/* Rules and guidelines section */}
        <RoundedDiv Element={Muskan} bg="#F5F5F5" top="-400px" />
        <RoundedDiv Element={Roobaroo} bg="#7BB9C4" />
        {/* Past Events and acheivements sections */}
        <RoundedDiv
          Element={FoodOutlet}
          bg="#F5F5F5"
          top="-200px"
        />
        {/* Gallery Section */}
        <RoundedDiv Element={Prayatna} bg="#7BB9C4" top="-300px" />
        <RoundedDiv Element={Sahyog} bg="#F5F5F5" top="-300px" />
        {/* Team Leaders Section */}
      </div>
      <Footer />
    </div>
  );
}

// Each section is defined seprately to animate
const FoodOutlet = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      
      <div className="w-full md:w-[50%] flex items-center justify-center">
        <Carousel
          className="w-[70%]"
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          emulateTouch={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          <img src={clubData.foodOutlet.img} alt="Sports activity" />
          <img
            src={clubData.foodOutlet.img2}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
          <img
            src={clubData.foodOutlet.img3}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
        New Food Outlets Onboarded
        </h1>

        {/* Paragraph */}
        <p className="text-[2.25vw] md:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.foodOutlet.text}
        </p>
      </div>
      {/* Image Section */}

    </div>
  );
};


const Roobaroo = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-6 sm:px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-2">
        {/* Title */}
        <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          Roobaroo
        </h1>

        {/* Paragraph */}
        <p className="text-[3vw] sm:text-[2.25vw] md:text-[1.75vw] lg:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
          {clubData.roobaroo.text}
        </p>

        {/* PDF Link */}
        <a
          href={clubData.roobaroo.pdf}
          target="_blank"
          rel="noreferrer"
          className="mt-2"
        >
          <FaRegFilePdf size={40} className="text-gray-700 sm:size-50" />
        </a>
      </div>

      {/* Image Section - Carousel */}
      <div className="w-full md:w-[50%] flex items-center justify-center mt-6 md:mt-0">
        <Carousel
          className="w-[85%] sm:w-[75%] md:w-[70%] lg:w-[60%]"
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          emulateTouch={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          <img src={clubData.roobaroo.img} alt="Sports activity" className="object-cover" />
          <img src={clubData.roobaroo.img2} alt="Sports activity" className="object-cover" />
          <img src={clubData.roobaroo.img3} alt="Sports activity" className="object-cover" />
        </Carousel>
      </div>
    </div>
  );
};

const Prayatna = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          Prayatna
        </h1>

        {/* Paragraph */}
        <p className="text-[2.25vw] md:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.prayatna.text}
        </p>
      </div>
      {/* Image Section */}
      {/* Carousal */}
      <div className="w-full md:w-[50%] flex items-center justify-center">
        <Carousel
          className="w-[70%]"
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          emulateTouch={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          <img src={clubData.prayatna.img} alt="Sports activity" />
          <img
            src={clubData.prayatna.img2}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
          <img
            src={clubData.prayatna.img3}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
};


const Muskan = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      
      {/* Image Section */}
      <div className="w-full md:w-[50%] flex items-center justify-center">
        <Carousel
          className="w-[70%]"
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          emulateTouch={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          <img src={clubData.muskan.img} alt="Sports activity" />
          <img
            src={clubData.muskan.img2}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
          <img
            src={clubData.muskan.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          Muskaan
        </h1>

        {/* Paragraph */}
        <p className="text-[2.25vw] md:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.muskan.text}
        </p>
      </div>
    </div>
  );
};


const Sahyog=()=>{
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      
      <div className="w-full md:w-[50%] flex items-center justify-center">
        <Carousel
          className="w-[70%]"
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          emulateTouch={true}
          stopOnHover={true}
          transitionTime={1000}
        >
          <img src={clubData.sahyog.img} alt="Sports activity" />
          <img
            src={clubData.sahyog.img2}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
        Sahyog
        </h1>

        {/* Paragraph */}
        <p className="text-[2.25vw] md:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.sahyog.text}
        </p>
      </div>
      {/* Image Section */}

    </div>
  );

}

export default EachEventPage;
